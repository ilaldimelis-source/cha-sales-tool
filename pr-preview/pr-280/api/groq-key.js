// CHA Sales Command Center — Vercel serverless function
// Returns the shared Groq API key from the GROQ_API_KEY environment variable.
//
// SECURITY MODEL: This endpoint exposes the key to anyone who can reach it.
// The site is gated behind Clerk auth on the front-end, but this endpoint
// itself is not auth-protected. Treat the returned key as a shared resource
// that authenticated agents can read; rotate it periodically and watch
// usage in the Groq console.
//
// Used by js/ai-tools.js as a fallback when an agent has not entered their
// own personal key in localStorage.

module.exports = function handler(req, res) {
  // Only GET is allowed
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // Defense-in-depth: tell every cache layer (browser, CDN, service worker)
  // not to store this response. Service worker bypass is also handled on the
  // client side via a cache-busting query param in ai-tools.js.
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, max-age=0'
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  var key = process.env.GROQ_API_KEY || '';

  if (!key) {
    res.status(500).json({ error: 'GROQ_API_KEY not configured' });
    return;
  }

  res.status(200).json({ key: key });
};
