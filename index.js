const express = require("express");
const mercury = require("@postlight/parser");
const striptags = require("striptags");

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const { url, clean } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Missing 'url' in request body" });
  }

  try {
    const result = await mercury.parse(url);

    const response = {
      title: result.title,
      url: result.url,
      date_published: result.date_published,
      lead_image_url: result.lead_image_url,
      excerpt: result.excerpt,
      word_count: result.word_count,
      content: clean ? striptags(result.content) : result.content,
    };

    res.json(response);
  } catch (error) {
    console.error("Error parsing article:", error.message);
    res.status(500).json({ error: "Failed to parse article" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mercury Parser running on port ${PORT}`);
});
