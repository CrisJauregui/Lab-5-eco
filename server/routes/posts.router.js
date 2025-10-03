const express = require("express");
const router = express.Router();

const {
  searchPostsByTitleController,
} = require("../controllers/posts.controller");

router.get("/posts/search", searchPostsByTitleController);

module.exports = router;