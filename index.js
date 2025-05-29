const express = require('express');
const bodyParser = require('body-parser');
const Mercury = require('@postlight/parser');
const striptags = require('striptags');

const app = express();
app.use(bodyParser.json());

app.post('/parser', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  try {
    const result = await Mercury.parse(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to parse URL', details: err.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Parser API running on port ${PORT}`));
