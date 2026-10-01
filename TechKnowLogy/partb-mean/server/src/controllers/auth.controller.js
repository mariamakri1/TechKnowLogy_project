const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {// ΕΓΓΡΑΦΗ
  try {// Λήψη δεδομένων από το αίτημα
    const {
      name,
      email,
      username,
      password,
      birthdate,
      gender,
      experience,
      goal,
      interests
    } = req.body;

    if (!username || !password || !email || !name) {// Έλεγχος για υποχρεωτικά πεδία
      return res.status(400).json({ message: 'Λείπουν υποχρεωτικά πεδία' });
    }

    const existingUser = await User.findOne({// Έλεγχος για υπάρχον email ή username
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email ή username υπάρχει ήδη' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);// Κρυπτογράφηση κωδικού

    const user = new User({// Δημιουργία νέου χρήστη
      name,
      email,
      username,
      password: hashedPassword,
      birthdate,
      gender,
      experience,
      goal,
      interests
    });

    const saved = await user.save();

    res.status(201).json({
      message: 'Επιτυχής εγγραφή',
      user: {
        id: saved._id,
        username: saved.username
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// LOGIN
exports.login = async (req, res) => {// ΕΙΣΟΔΟΣ
  try {// Λήψη δεδομένων από το αίτημα
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {// Έλεγχος για ύπαρξη χρήστη
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);// Έλεγχος κωδικού
    if (!isMatch) {// Αν δεν ταιριάζει ο κωδικός
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
