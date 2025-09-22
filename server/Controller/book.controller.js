const Book = require("../Model/book.model");
const Review = require("../Model/review.model");

// POST: /api/books - creates a book
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, price, description } = req.body;

    //validating
    if (!title || !author || !genre) {
      return res
        .status(400)
        .json({ message: "Title, author, and genre are required" });
    }

    //creating a book
    const newBook = await Book.create({
      title,
      author,
      genre,
      price,
      description,
      postedBy: req.user.id, //from protect middleware
    });

    res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET: /api/books?page=?&limit=?&author=?&genre=? - fetch books
exports.getBook = async (req, res) => {
  try {
    let { page = 1, limit = 10, author, genre } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const books = await Book.find({
      ...(author && { author: new RegExp(author, "i") }), //make it case-insensitive
      ...(genre && { genre: new RegExp(genre, "i") }),
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Book.length;

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      books,
    });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST: /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    let { page = 1, limit = 5 } = req.query; // Reviews pagination
    page = parseInt(page);
    limit = parseInt(limit);

    // Fetch the book
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Fetch reviews for the book with pagination
    const reviews = await Review.find({ book: id })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    //average rating logic
    const ratingAggregation = await Review.aggregate([
      { $match: { book: book._id } },
      {
        $group: {
          _id: "$book",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    const averageRating = ratingAggregation[0]?.avgRating || 0;
    const totalReviews = ratingAggregation[0]?.totalReviews || 0;

    res.json({
      book,
      reviews,
      averageRating,
      totalReviews,
      page,
      pages: Math.ceil(totalReviews / limit),
    });
  } catch (err) {
    console.error("Error fetching book details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST api/books/:id/review
exports.createReview = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user._id; // from protect middleware
    const { rating, comment } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Check if user already reviewed the book
    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview)
      return res
        .status(400)
        .json({ message: "You have already reviewed this book" });

    // Create review
    const review = await Review.create({
      book: bookId,
      user: userId,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review added successfully", review });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ message: "Server error" });
  }
};
