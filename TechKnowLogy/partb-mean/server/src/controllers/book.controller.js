
const Book = require('../models/Book');

// GET /api/books
exports.getBooks = async (req, res) => {// Λήψη όλων των βιβλίων από τη βάση δεδομένων
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/books
exports.createBook = async (req, res) => {// Δημιουργία νέου βιβλίου και αποθήκευσή του στη βάση δεδομένων
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
