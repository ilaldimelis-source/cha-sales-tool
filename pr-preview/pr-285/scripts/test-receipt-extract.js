#!/usr/bin/env node
'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var vm = require('vm');
var handler = require('../api/receipt-extract');

var groqCalls = 0;

function resetEnv(opts) {
  groqCalls = 0;
  handler._testHooks.authenticate = null;
  handler._testHooks.log = null;
  handler._testHooks.groqFetch = function () {
    groqCalls += 1;
    throw new Error('Groq fetch must not be called in this test');
  };
  if (opts.clerk === 'missing') {
    delete process.env.CLERK_SECRET_KEY;
  } else if (opts.clerk === 'malformed') {
    process.env.CLERK_SECRET_KEY =
      'pk_test_d2hvbGUtdmlwZXItODkuY2xlcmsuYWNjb3VudHMuZGV2JA';
  } else {
    process.env.CLERK_SECRET_KEY = 'sk_test_fake_secret_key_for_unit_tests';
  }
  if (opts.groq === 'missing') {
    delete process.env.GROQ_API_KEY;
  } else {
    process.env.GROQ_API_KEY = 'gsk_fake_for_unit_tests';
  }
}

function mockRes() {
  var r = {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader: function (k, v) {
      r.headers[k] = v;
    },
    status: function (code) {
      r.statusCode = code;
      return r;
    },
    json: function (obj) {
      r.body = obj;
      return r;
    }
  };
  return r;
}

function mockReq(opts) {
  opts = opts || {};
  return {
    method: opts.method || 'POST',
    url: '/api/receipt-extract',
    headers: opts.headers || {},
    body: opts.body
  };
}

function run(name, fn) {
  return Promise.resolve()
    .then(fn)
    .then(function () {
      console.log('PASS  ' + name);
    });
}

function expectNoGroq() {
  assert.strictEqual(
    groqCalls,
    0,
    'expected zero Groq calls, got ' + groqCalls
  );
}

function b64urlJson(obj) {
  return Buffer.from(JSON.stringify(obj), 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function makeJwt(payload) {
  return (
    b64urlJson({ alg: 'none', typ: 'JWT' }) + '.' + b64urlJson(payload) + '.sig'
  );
}

var DIAG_LOG_KEYS = {
  hasBearer: true,
  hasSessionCookie: true,
  hasDevBrowserCookie: true,
  authStatus: true,
  authReason: true,
  secretKind: true,
  azp: true,
  iss: true,
  outcomeStatus: true,
  durationMs: true
};

function assertSafeDiagRow(row, forbidden) {
  assert.ok(row && typeof row === 'object');
  var keys = Object.keys(row);
  var i;
  for (i = 0; i < keys.length; i++) {
    assert.ok(DIAG_LOG_KEYS[keys[i]], 'unexpected diag key ' + keys[i]);
  }
  var blob = JSON.stringify(row);
  for (i = 0; i < forbidden.length; i++) {
    assert.ok(
      blob.indexOf(forbidden[i]) === -1,
      'diag log leaked ' + forbidden[i]
    );
  }
  assert.ok(
    row.secretKind === 'sk_test' ||
      row.secretKind === 'sk_live' ||
      row.secretKind === 'other'
  );
}

function loadExtractClient(opts) {
  opts = opts || {};
  var src = fs.readFileSync(
    path.join(__dirname, '..', 'js', 'sales-tracker.js'),
    'utf8'
  );
  var begin = src.indexOf('// --- CHA_CLERK_TOKEN_HELPERS_BEGIN ---');
  var end = src.indexOf('function _stSecureReceiptExtractPrimary');
  assert.ok(begin >= 0 && end > begin, 'client helper markers missing');
  var block = src.slice(begin, end);
  var sent = { headers: {}, body: null };
  function XMLHttpRequest() {
    this.status = 200;
    this.responseText = '{"ok":true}';
    this.withCredentials = false;
  }
  XMLHttpRequest.prototype.open = function () {};
  XMLHttpRequest.prototype.setRequestHeader = function (k, v) {
    sent.headers[k] = v;
  };
  XMLHttpRequest.prototype.send = function (body) {
    sent.body = body;
  };
  var windowObj = opts.window || {};
  var now = typeof opts.now === 'number' ? opts.now : Date.now();
  var sandbox = {
    window: windowObj,
    Clerk: windowObj.Clerk,
    atob: function (s) {
      return Buffer.from(s, 'base64').toString('binary');
    },
    Date: {
      now: function () {
        return now;
      }
    },
    Math: Math,
    JSON: JSON,
    isFinite: isFinite,
    String: String,
    XMLHttpRequest: XMLHttpRequest
  };
  vm.runInNewContext(block, sandbox);
  return {
    sent: sent,
    post: function (raw, stage) {
      return sandbox._stReceiptExtractPost(raw, stage);
    },
    bearer: function () {
      return sandbox._stClerkBearerForExtract();
    },
    sessionToken: function () {
      return sandbox._stClerkSessionToken();
    }
  };
}

Promise.resolve()
  .then(function () {
    return run('GET -> 405, zero Groq call', function () {
      resetEnv({ clerk: 'ok', groq: 'ok' });
      var res = mockRes();
      return handler(mockReq({ method: 'GET', body: {} }), res).then(
        function () {
          assert.strictEqual(res.statusCode, 405);
          expectNoGroq();
        }
      );
    });
  })
  .then(function () {
    return run(
      'anonymous POST (no cookie/bearer) -> 401, zero Groq call',
      function () {
        resetEnv({ clerk: 'ok', groq: 'ok' });
        handler._testHooks.authenticate = function () {
          throw new Error('authenticateRequest must not run without a token');
        };
        var res = mockRes();
        return handler(
          mockReq({
            method: 'POST',
            headers: {},
            body: { receipt: 'Confirmation Alice Test Plan $100 per Month' }
          }),
          res
        ).then(function () {
          assert.strictEqual(res.statusCode, 401);
          assert.strictEqual(res.body && res.body.error, 'Unauthorized');
          expectNoGroq();
        });
      }
    );
  })
  .then(function () {
    return run('missing CLERK_SECRET_KEY -> 503, zero Groq call', function () {
      resetEnv({ clerk: 'missing', groq: 'ok' });
      handler._testHooks.authenticate = function () {
        throw new Error(
          'authenticateRequest must not run when Clerk is unconfigured'
        );
      };
      var res = mockRes();
      return handler(
        mockReq({
          headers: { authorization: 'Bearer fake.jwt.token' },
          body: { receipt: 'hello' }
        }),
        res
      ).then(function () {
        assert.strictEqual(res.statusCode, 503);
        expectNoGroq();
      });
    });
  })
  .then(function () {
    return run(
      'malformed CLERK_SECRET_KEY (pk_ in sk slot) -> 503, zero Groq call',
      function () {
        resetEnv({ clerk: 'malformed', groq: 'ok' });
        handler._testHooks.authenticate = function () {
          throw new Error(
            'authenticateRequest must not run when Clerk secret is malformed'
          );
        };
        var res = mockRes();
        return handler(
          mockReq({
            headers: { authorization: 'Bearer fake.jwt.token' },
            body: { receipt: 'hello' }
          }),
          res
        ).then(function () {
          assert.strictEqual(res.statusCode, 503);
          expectNoGroq();
        });
      }
    );
  })
  .then(function () {
    return run(
      'unauthenticated token present -> 401, zero Groq call',
      function () {
        resetEnv({ clerk: 'ok', groq: 'ok' });
        handler._testHooks.authenticate = function () {
          return Promise.resolve({ isAuthenticated: false, isSignedIn: false });
        };
        var res = mockRes();
        return handler(
          mockReq({
            headers: { authorization: 'Bearer fake.jwt.token' },
            body: { receipt: 'hello' }
          }),
          res
        ).then(function () {
          assert.strictEqual(res.statusCode, 401);
          expectNoGroq();
        });
      }
    );
  })
  .then(function () {
    return run(
      'missing GROQ_API_KEY after auth -> 503, zero Groq call',
      function () {
        resetEnv({ clerk: 'ok', groq: 'missing' });
        handler._testHooks.authenticate = function () {
          return Promise.resolve({ isAuthenticated: true });
        };
        var res = mockRes();
        return handler(
          mockReq({
            headers: { authorization: 'Bearer fake.jwt.token' },
            body: { receipt: 'hello' }
          }),
          res
        ).then(function () {
          assert.strictEqual(res.statusCode, 503);
          expectNoGroq();
        });
      }
    );
  })
  .then(function () {
    return run('oversized receipt -> 400, zero Groq call', function () {
      resetEnv({ clerk: 'ok', groq: 'ok' });
      handler._testHooks.authenticate = function () {
        return Promise.resolve({ isAuthenticated: true });
      };
      var huge = '';
      while (huge.length < 20001) huge += 'x';
      var res = mockRes();
      return handler(
        mockReq({
          headers: { authorization: 'Bearer fake.jwt.token' },
          body: { receipt: huge }
        }),
        res
      ).then(function () {
        assert.strictEqual(res.statusCode, 400);
        expectNoGroq();
      });
    });
  })
  .then(function () {
    return run('authenticated primary happy-path contract', function () {
      resetEnv({ clerk: 'ok', groq: 'ok' });
      handler._testHooks.authenticate = function () {
        return Promise.resolve({ isAuthenticated: true });
      };
      handler._testHooks.groqFetch = function (url, init) {
        groqCalls += 1;
        assert.strictEqual(
          url,
          'https://api.groq.com/openai/v1/chat/completions'
        );
        var payload = JSON.parse(init.body);
        assert.strictEqual(payload.model, 'openai/gpt-oss-20b');
        assert.strictEqual(payload.max_tokens, 900);
        assert.strictEqual(payload.temperature, 0.05);
        assert.ok(!Object.prototype.hasOwnProperty.call(payload, 'system'));
        return Promise.resolve({
          ok: true,
          json: function () {
            return Promise.resolve({
              choices: [
                {
                  message: {
                    content: JSON.stringify({
                      customer: 'Jane Doe',
                      memberId: '123456789',
                      saleDate: '2026-09-14',
                      planName: 'Health Choice 3',
                      planPremium: 199.5,
                      enrollmentFee: 125,
                      addons: [{ name: 'Dental', monthlyPrice: 35 }],
                      agent: 'Alex Agent'
                    })
                  }
                }
              ]
            });
          }
        });
      };
      var res = mockRes();
      return handler(
        mockReq({
          headers: {
            authorization: 'Bearer fake.jwt.token',
            cookie: '__session=fake.jwt.token'
          },
          body: {
            receipt: 'Jane Doe confirmation Health Choice 3',
            stage: 'primary',
            model: 'should-be-ignored',
            temperature: 99,
            max_tokens: 1
          }
        }),
        res
      ).then(function () {
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(groqCalls, 1);
        assert.deepStrictEqual(res.body, {
          customer: 'Jane Doe',
          memberId: '123456789',
          saleDate: '2026-09-14',
          planName: 'Health Choice 3',
          planPremium: 199.5,
          enrollmentFee: 125,
          addons: [{ name: 'Dental', monthlyPrice: 35 }],
          agent: 'Alex Agent'
        });
        assert.ok(!res.body.model);
        assert.ok(!String(JSON.stringify(res.body)).includes('gsk_'));
      });
    });
  })
  .then(function () {
    return run('authenticated fallback happy-path contract', function () {
      resetEnv({ clerk: 'ok', groq: 'ok' });
      handler._testHooks.authenticate = function () {
        return Promise.resolve({ isAuthenticated: true });
      };
      handler._testHooks.groqFetch = function (_url, init) {
        groqCalls += 1;
        var payload = JSON.parse(init.body);
        assert.strictEqual(payload.max_tokens, 800);
        assert.strictEqual(payload.temperature, 0.1);
        return Promise.resolve({
          ok: true,
          json: function () {
            return Promise.resolve({
              choices: [
                {
                  message: {
                    content:
                      '```json\n{"customer":"Pat Lee","memberId":"987654321","saleDate":"2026-09-01","products":[{"name":"Core Plan","price":220,"type":"deal"}]}\n```'
                  }
                }
              ]
            });
          }
        });
      };
      var res = mockRes();
      return handler(
        mockReq({
          headers: { authorization: 'Bearer fake.jwt.token' },
          body: { receipt: 'unknown layout', stage: 'fallback' }
        }),
        res
      ).then(function () {
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(groqCalls, 1);
        assert.deepStrictEqual(res.body.products, [
          { name: 'Core Plan', price: 220, type: 'deal' }
        ]);
        assert.strictEqual(res.body.customer, 'Pat Lee');
      });
    });
  })
  .then(function () {
    return run('upstream Groq failure does not echo raw body', function () {
      resetEnv({ clerk: 'ok', groq: 'ok' });
      handler._testHooks.authenticate = function () {
        return Promise.resolve({ isAuthenticated: true });
      };
      handler._testHooks.groqFetch = function () {
        groqCalls += 1;
        return Promise.resolve({
          ok: false,
          status: 429,
          json: function () {
            return Promise.resolve({
              error: { message: 'SECRET_LEAK gsk_live_abc' }
            });
          }
        });
      };
      var res = mockRes();
      return handler(
        mockReq({
          headers: { authorization: 'Bearer fake.jwt.token' },
          body: { receipt: 'hello' }
        }),
        res
      ).then(function () {
        assert.strictEqual(res.statusCode, 502);
        assert.strictEqual(res.body.error, 'Extraction failed');
        assert.ok(!JSON.stringify(res.body).includes('gsk_live'));
        assert.ok(!JSON.stringify(res.body).includes('SECRET_LEAK'));
      });
    });
  })
  .then(function () {
    assert.deepStrictEqual(handler._AUTHORIZED_PARTIES, [
      'https://cha-sales-tool-main.vercel.app',
      'https://cha-sales-tool-dhca.vercel.app'
    ]);
    console.log(
      'PASS  authorizedParties is exactly the two live production origins'
    );
  })
  .then(function () {
    var st = fs.readFileSync(
      path.join(__dirname, '..', 'js', 'sales-tracker.js'),
      'utf8'
    );
    var jsDir = path.join(__dirname, '..', 'js');
    var jsFiles = fs.readdirSync(jsDir).filter(function (f) {
      return f.slice(-3) === '.js';
    });
    for (var i = 0; i < jsFiles.length; i++) {
      var src = fs.readFileSync(path.join(jsDir, jsFiles[i]), 'utf8');
      assert.ok(
        src.indexOf('api.groq.com') === -1,
        jsFiles[i] + ' must not call api.groq.com'
      );
      assert.ok(
        src.indexOf('GROQ_API_KEY') === -1,
        jsFiles[i] + ' must not mention GROQ_API_KEY'
      );
    }
    assert.ok(st.indexOf('/api/receipt-extract') !== -1);
    assert.ok(st.indexOf('if (xhr.status !== 200) return null') !== -1);
    assert.ok(st.indexOf('_stSecureReceiptExtractPrimary') !== -1);
    assert.ok(st.indexOf("_stReceiptExtractPost(raw, 'fallback')") !== -1);
    assert.ok(st.indexOf('var tok = _stClerkBearerForExtract();') !== -1);
    var helperBlock = st.slice(
      st.indexOf('CHA_CLERK_TOKEN_HELPERS_BEGIN'),
      st.indexOf('CHA_CLERK_TOKEN_HELPERS_END')
    );
    assert.ok(helperBlock.indexOf('_stLastActiveJwt') !== -1);
    assert.ok(
      helperBlock.indexOf('_stLastActiveJwt') <
        helperBlock.indexOf('window.__CHA_CLERK_TOKEN')
    );
    console.log(
      'PASS  client uses same-origin extract, silent non-200, no browser Groq'
    );
  })
  .then(function () {
    return run(
      'expired Bearer is dropped client-side rather than sent',
      function () {
        var now = 1700000000000;
        var nowSec = Math.floor(now / 1000);
        var expired = makeJwt({
          exp: nowSec - 30,
          azp: 'https://cha-sales-tool-dhca.vercel.app'
        });
        var expiringSoon = makeJwt({
          exp: nowSec + 3,
          azp: 'https://cha-sales-tool-dhca.vercel.app'
        });
        var fresh = makeJwt({
          exp: nowSec + 60,
          azp: 'https://cha-sales-tool-dhca.vercel.app'
        });

        var expiredCache = loadExtractClient({
          now: now,
          window: { __CHA_CLERK_TOKEN: expired }
        });
        assert.strictEqual(expiredCache.bearer(), '');
        expiredCache.post(
          'Confirmation Alice Test Plan $100 per Month',
          'primary'
        );
        assert.ok(
          !expiredCache.sent.headers.Authorization,
          'expired cache must not set Authorization'
        );
        assert.ok(
          String(expiredCache.sent.body).indexOf('Alice Test Plan') !== -1,
          'request body still sent without Bearer'
        );

        var soon = loadExtractClient({
          now: now,
          window: { __CHA_CLERK_TOKEN: expiringSoon }
        });
        soon.post('receipt', 'primary');
        assert.ok(
          !soon.sent.headers.Authorization,
          'token expiring within 5s must not set Authorization'
        );

        var liveOverCache = loadExtractClient({
          now: now,
          window: {
            __CHA_CLERK_TOKEN: expired,
            Clerk: {
              session: {
                lastActiveToken: {
                  jwt: fresh,
                  getRawString: function () {
                    return fresh;
                  }
                }
              }
            }
          }
        });
        liveOverCache.post('receipt', 'primary');
        assert.strictEqual(
          liveOverCache.sent.headers.Authorization,
          'Bearer ' + fresh
        );

        var objectJwt = loadExtractClient({
          now: now,
          window: {
            __CHA_CLERK_TOKEN: fresh,
            Clerk: {
              session: {
                lastActiveToken: {
                  jwt: { alg: 'RS256' }
                }
              }
            }
          }
        });
        assert.notStrictEqual(
          String(objectJwt.sessionToken()),
          '[object Object]'
        );
        objectJwt.post('receipt', 'primary');
        assert.strictEqual(
          objectJwt.sent.headers.Authorization,
          'Bearer ' + fresh
        );

        var malformed = loadExtractClient({
          now: now,
          window: { __CHA_CLERK_TOKEN: 'not-a-jwt' }
        });
        malformed.post('receipt', 'primary');
        assert.ok(!malformed.sent.headers.Authorization);
      }
    );
  })
  .then(function () {
    return run(
      'diag logs never include receipt, token, or secrets',
      function () {
        resetEnv({ clerk: 'ok', groq: 'ok' });
        var leakReceipt =
          'LEAK_RECEIPT_ALICE member 999111222 Health Choice 3 $199';
        var leakJwt = makeJwt({
          sub: 'user_LEAK_ID',
          sid: 'sess_LEAK',
          azp: 'https://cha-sales-tool-dhca.vercel.app',
          iss: 'https://whole-viper-89.clerk.accounts.dev',
          exp: Math.floor(Date.now() / 1000) + 120
        });
        var forbidden = [
          leakReceipt,
          'LEAK_RECEIPT_ALICE',
          'user_LEAK_ID',
          'sess_LEAK',
          leakJwt,
          'sk_test_fake_secret_key_for_unit_tests',
          'gsk_fake_for_unit_tests',
          'gsk_'
        ];
        var captured = [];
        handler._testHooks.log = function (row) {
          captured.push(row);
        };
        var origLog = console.log;
        var consoleLines = [];
        console.log = function () {
          consoleLines.push(
            Array.prototype.slice.call(arguments).map(String).join(' ')
          );
        };
        handler._testHooks.authenticate = function () {
          var err = new Error('do-not-log ' + leakJwt + ' gsk_live_abc');
          err.reason = 'token-invalid-authorized-parties';
          return Promise.reject(err);
        };
        var res = mockRes();
        return handler(
          mockReq({
            headers: {
              authorization: 'Bearer ' + leakJwt,
              cookie: '__session=' + leakJwt + '; __clerk_db_jwt=devbrowser'
            },
            body: { receipt: leakReceipt }
          }),
          res
        )
          .then(function () {
            console.log = origLog;
            assert.strictEqual(res.statusCode, 401);
            expectNoGroq();
            assert.strictEqual(captured.length, 1);
            assertSafeDiagRow(captured[0], forbidden);
            assert.strictEqual(captured[0].hasBearer, true);
            assert.strictEqual(captured[0].hasSessionCookie, true);
            assert.strictEqual(captured[0].hasDevBrowserCookie, true);
            assert.strictEqual(captured[0].authStatus, 'error');
            assert.strictEqual(
              captured[0].authReason,
              'token-invalid-authorized-parties'
            );
            assert.strictEqual(captured[0].secretKind, 'sk_test');
            assert.strictEqual(
              captured[0].azp,
              'https://cha-sales-tool-dhca.vercel.app'
            );
            assert.strictEqual(
              captured[0].iss,
              'https://whole-viper-89.clerk.accounts.dev'
            );
            assert.strictEqual(captured[0].outcomeStatus, 401);
            assert.ok(typeof captured[0].durationMs === 'number');
            var joined = consoleLines.join('\n');
            var fi;
            for (fi = 0; fi < forbidden.length; fi++) {
              assert.ok(
                joined.indexOf(forbidden[fi]) === -1,
                'console.log leaked ' + forbidden[fi]
              );
            }
            assert.ok(joined.indexOf('[receipt-extract]') !== -1);
          })
          .catch(function (err) {
            console.log = origLog;
            throw err;
          });
      }
    );
  })
  .then(function () {
    console.log('\nAll receipt-extract checks passed.');
  })
  .catch(function (err) {
    console.error('\nFAIL  ' + (err && err.stack ? err.stack : err));
    process.exit(1);
  });
