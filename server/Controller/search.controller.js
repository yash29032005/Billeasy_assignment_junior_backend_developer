const Book = require("../Model/book.model");

// GET api/search?query=?
exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchRegex = new RegExp(query, "i"); // case-insensitive, partial match

    const books = await Book.find({
      $or: [{ title: searchRegex }, { author: searchRegex }],
    }).sort({ createdAt: -1 });

    const total = await Book.countDocuments({
      $or: [{ title: searchRegex }, { author: searchRegex }],
    });

    res.json({
      books,
    });
  } catch (err) {
    console.error("Error searching books:", err);
    res.status(500).json({ message: "Server error" });
  }
};
