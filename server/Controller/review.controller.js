const Review = require("../Model/review.model");

// PUT api/reviews/:id – Update your own review
exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user._id; // from protect middleware
    const { rating, comment } = req.body;

    // Find the review
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Ensure the review belongs to the logged-in user
    if (review.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You can only update your own review" });
    }

    // Update fields
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();

    res.json({ message: "Review updated successfully", review });
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE api/reviews/:id – Delete your own review
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user._id; // from protect middleware

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Ensure the review belongs to the logged-in user
    if (review.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own review" });
    }

    await review.deleteOne();

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json({ message: "Server error" });
  }
};
