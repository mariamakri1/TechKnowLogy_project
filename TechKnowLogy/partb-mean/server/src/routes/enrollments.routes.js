const express = require('express');
const router = express.Router();
const controller = require('../controllers/enrollments.controller');

router.post('/', controller.createEnrollment);
router.get('/', controller.getEnrollments);
router.get('/user/:userId', controller.getEnrollmentsByUser);

module.exports = router;
