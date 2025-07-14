const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.post('/', async (req, res) => {
  const zapierUrl = 'https://hooks.zapier.com/hooks/catch/23779999/u2u1shg/';
  try {
    console.log('Received request body:', req.body);
    const zapierRes = await fetch(zapierUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await zapierRes.text();
    console.log('Zapier response status:', zapierRes.status);
    console.log('Zapier response body:', data);
    if (zapierRes.ok) {
      res.status(200).json({ success: true, zapierStatus: zapierRes.status, zapierBody: data });
    } else {
      res.status(zapierRes.status).json({ success: false, error: data, zapierStatus: zapierRes.status });
    }
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ success: false, error: (err && err.stack ? err.stack : err) });
  }
});

module.exports = router; 