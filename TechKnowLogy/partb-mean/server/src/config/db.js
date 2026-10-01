//Είναι το αρχείο που αναλαμβάνει αποκλειστικά τη σύνδεση με τη MongoDB.

const mongoose = require('mongoose');

const connectDB = async () => {// Συνδέεται με τη βάση δεδομένων MongoDB χρησιμοποιώντας το URI από τις μεταβλητές περιβάλλοντος
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
