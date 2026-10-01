const express = require('express');
const router = express.Router();
const booksController = require('../controllers/book.controller');

router.get('/', booksController.getBooks);
router.post('/', booksController.createBook);

module.exports = router;
