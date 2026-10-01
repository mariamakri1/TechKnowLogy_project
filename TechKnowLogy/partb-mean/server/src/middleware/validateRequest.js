module.exports = (requiredFields) => {// Middleware για την επικύρωση των πεδίων σε ένα αίτημα (request)
  return (req, res, next) => {// Επιστρέφει ένα middleware function που ελέγχει αν τα απαιτούμενα πεδία υπάρχουν στο req.body
    for (const field of requiredFields) {// Για κάθε απαιτούμενο πεδίο
      if (!req.body[field]) {// Εάν το πεδίο λείπει από το req.body
        return res
          .status(400)
          .json({ message: `Missing field: ${field}` });
      }
    }
    next();
  };
};
