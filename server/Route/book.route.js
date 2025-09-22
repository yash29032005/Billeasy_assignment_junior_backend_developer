const express = require("express");
const router = express.Router();
const { protect } = require("../Middleware/auth");
const {
  createBook,
  getBook,
  getBookById,
  createReview,
} = require("../Controller/book.controller");

// POST: /api/books - creates a book
router.post("/", protect, createBook);

// GET: /api/books?page=?&limit=?&author=?&genre=? - fetch books
router.get("/", getBook);

// POST: /api/books/:id
router.get("/:id", getBookById);

// POST api/books/:id/review
router.post("/:id/review", protect, createReview);

module.exports = router;
