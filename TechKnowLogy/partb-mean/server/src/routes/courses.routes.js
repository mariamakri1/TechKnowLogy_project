//ορίζει τα endpoints (URLs) και τα συνδέει με controller functions
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courses.controller');


router.post('/', courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);

module.exports = router;
