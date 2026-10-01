
//Το controller χειρίζεται τα requests, εφαρμόζει τη λογική της εφαρμογής, επικοινωνεί με τη βάση μέσω των models και επιστρέφει την κατάλληλη απάντηση στον client.»
const Course = require('../models/Course');

// POST /api/courses
 //Το req.body περιέχει τα δεδομένα που στέλνει ο client στο POST request, αφού πρώτα μετατραπούν από JSON σε JavaScript object μέσω του express.json middleware sto app.js
  
exports.createCourse = async (req, res) => {// Δημιουργία νέου μαθήματος και αποθήκευσή του στη βάση δεδομένων
   
  try {
    const course = new Course(req.body);
    const saved = await course.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/courses
exports.getCourses = async (req, res) => {
  try {// Λήψη όλων των μαθημάτων από τη βάση δεδομένων
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Σφάλμα ανάκτησης μαθημάτων' });
  }
};

// GET /api/courses/:id
exports.getCourseById = async (req, res) => {
  try {// Λήψη μαθήματος με βάση το ID από τη βάση δεδομένων
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Το μάθημα δεν βρέθηκε' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Σφάλμα server' });
  }
};
