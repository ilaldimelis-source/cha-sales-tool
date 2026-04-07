require('dotenv').config();
var fetch = require('node-fetch');

var emails = [
  'milaldi@siabenefits.com',
  'asommers@siabenefits.com',
  'aavalos@siabenefits.com',
  'alavalos@siabenefits.com',
  'ahopkins@siabenefits.com',
  'davalos@siabenefits.com',
  'Dgoetz@siabenefits.com',
  'dilaldi@siabenefits.com',
  'fcesped@siabenefits.com',
  'hnavarro@siabenefits.com',
  'jbuck@siabenefits.com',
  'jlaster@siabenefits.com',
  'jsweeney@siabenefits.com',
  'jpadilla@siabenefits.com',
  'jbiggam@siabenefits.com',
  'jstubbs@siabenefits.com',
  'mhall@siabenefits.com',
  'plind@siabenefits.com'
];

var REDIRECT_URL = 'https://cha-sales-tool-xi.vercel.app';
var CLERK_SECRET = process.env.CLERK_SECRET_KEY;

if (!CLERK_SECRET || !CLERK_SECRET.startsWith('sk_')) {
  console.log('ERROR: Add CLERK_SECRET_KEY=sk_test_... to your .env file');
  console.log('Get it from: dashboard.clerk.com → API Keys → Secret keys');
  process.exit(1);
}

function delay(ms) { return new Promise(function(r){ setTimeout(r,ms); }); }

async function runInvites() {
  console.log('Inviting ' + emails.length + ' agents...\n');
  var success = [], failed = [];
  for (var i = 0; i < emails.length; i++) {
    var email = emails[i].trim().toLowerCase();
    try {
      var res = await fetch('https://api.clerk.com/v1/invitations', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + CLERK_SECRET,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email_address: email, redirect_url: REDIRECT_URL })
      });
      var data = await res.json();
      if (res.ok) {
        console.log('✅ ' + email);
        success.push(email);
      } else {
        var msg = data.errors && data.errors[0] ? data.errors[0].message : JSON.stringify(data);
        if (msg.toLowerCase().indexOf('already') !== -1) {
          console.log('⏭  Already invited: ' + email);
        } else {
          console.log('❌ ' + email + ' — ' + msg);
          failed.push(email);
        }
      }
    } catch(e) {
      console.log('❌ ' + email + ' — ' + e.message);
      failed.push(email);
    }
    await delay(500);
  }
  console.log('\n✅ Invited: ' + success.length + '  ❌ Failed: ' + failed.length);
  if (failed.length) { console.log('Failed:'); failed.forEach(function(e){ console.log('  • ' + e); }); }
}

runInvites();
