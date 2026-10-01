const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videos.controller');

router.get('/', videoController.getVideos);
router.post('/', videoController.createVideo);

module.exports = router;
