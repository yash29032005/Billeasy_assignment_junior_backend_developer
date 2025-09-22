const express = require("express");
const router = express.Router();
const { protect } = require("../Middleware/auth");
const {
  updateReview,
  deleteReview,
} = require("../Controller/review.controller");

// PUT api/reviews/:id – Update your own review
router.put("/:id", protect, updateReview);

// DELETE api/reviews/:id – Delete your own review
router.delete("/:id", protect, deleteReview);

module.exports = router;
