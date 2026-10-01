const Enrollment = require('../models/Enrollment');

// POST /api/enrollments
exports.createEnrollment = async (req, res) => {
  try {
    const { user, course } = req.body;

    // Έλεγχος αν υπάρχει ήδη εγγραφή
    const exists = await Enrollment.findOne({ user, course });
    if (exists) {
      return res.status(400).json({ message: 'Ο χρήστης είναι ήδη εγγεγραμμένος στο μάθημα' });
    }

    const enrollment = new Enrollment({ user, course });
    const saved = await enrollment.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/enrollments
exports.getEnrollments = async (req, res) => {
  const enrollments = await Enrollment
    .find()
    .populate('user')
    .populate('course');

  res.json(enrollments);
};

// GET /api/enrollments/user/:userId
exports.getEnrollmentsByUser = async (req, res) => {
  const enrollments = await Enrollment
    .find({ user: req.params.userId })
    .populate('course');

  res.json(enrollments);
};
