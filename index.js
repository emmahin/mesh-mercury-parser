const express = require("express");
const Mercury = require("@postlight/parser");
const striptags = require("striptags");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Missing 'url' in request body" });
  }

  try {
    const article = await Mercury.parse(url);

    // Ajout du contenu brut sans HTML
    article.content_plain = striptags(article.content);

    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to parse article" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
