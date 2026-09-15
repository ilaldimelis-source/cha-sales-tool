#!/usr/bin/env node
'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var handler = require('../api/receipt-extract');

var groqCalls = 0;

function resetEnv(opts) {
  groqCalls = 0;
  handler._testHooks.authenticate = null;
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
    assert.ok(
      handler._AUTHORIZED_PARTIES.indexOf(
        'https://cha-sales-tool.vercel.app'
      ) !== -1
    );
    assert.ok(
      handler._AUTHORIZED_PARTIES.indexOf(
        'https://cha-sales-tool-xi.vercel.app'
      ) !== -1
    );
    console.log('PASS  authorizedParties includes both production origins');
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
    console.log(
      'PASS  client uses same-origin extract, silent non-200, no browser Groq'
    );
  })
  .then(function () {
    console.log('\nAll receipt-extract checks passed.');
  })
  .catch(function (err) {
    console.error('\nFAIL  ' + (err && err.stack ? err.stack : err));
    process.exit(1);
  });
