const { searchPostsByTitle } = require("../db/posts.db");

const searchPostsByTitleController = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ error: "Parámetro 'title' es requerido" });
    }

    const posts = await searchPostsByTitle(title);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  searchPostsByTitleController,
};