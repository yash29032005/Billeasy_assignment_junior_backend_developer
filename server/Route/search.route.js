const express = require("express");
const { searchBooks } = require("../Controller/search.controller");
const router = express.Router();

// GET api/search?query=?
router.get("/", searchBooks);

module.exports = router;
