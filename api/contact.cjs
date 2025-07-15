const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
    return;
  }
  const zapierUrl = 'https://hooks.zapier.com/hooks/catch/23779999/u2u1shg/';
  try {
    const zapierRes = await fetch(zapierUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await zapierRes.text();
    if (zapierRes.ok) {
      res.status(200).json({ success: true, zapierStatus: zapierRes.status, zapierBody: data });
    } else {
      res.status(zapierRes.status).json({ success: false, error: data, zapierStatus: zapierRes.status });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: (err && err.stack ? err.stack : err) });
  }
}; 