const Review = require('../models/Review');

// POST create a new review
exports.createReview = async (req, res, next) => {
  try {// Δημιουργία νέας κριτικής και αποθήκευσή της στη βάση δεδομένων
    const review = new Review(req.body);
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// GET all reviews
exports.getReviews = async (req, res, next) => {
  try {// Λήψη όλων των κριτικών από τη βάση δεδομένων με populate για user και course
    const reviews = await Review.find()
      .populate('user')
      .populate('course');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};
