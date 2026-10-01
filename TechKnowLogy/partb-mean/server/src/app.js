const express = require('express');
const cors = require('cors'); //Το CORS επιτρέπει στο frontend (άλλο port) να μιλάει με τον server
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();

// middleware
app.use(cors());//Επιτρέπει requests από frontend (π.χ. localhost:5173).
app.use(express.json());//Επιτρέπει να διαβάζουμε JSON body σε POST requests

// routes
const coursesRoutes = require('./routes/courses.routes');
const enrollmentRoutes = require('./routes/enrollments.routes');
const authRoutes = require('./routes/auth.routes');
const reviewRoutes = require('./routes/reviews.routes');
const booksRoutes = require('./routes/book.routes');
const videoRoutes = require('./routes/videos.routes');



app.use('/api/courses', coursesRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/books', booksRoutes);


// db
connectDB();

// test route
app.get('/', (req, res) => {
  res.send('Server works');
});

// error handler (ΠΑΝΤΑ ΤΕΛΕΥΤΑΙΟ)

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
