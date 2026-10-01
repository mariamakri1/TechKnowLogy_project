const Video = require('../models/Video');

// GET /api/videos
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/videos (για seed)
exports.createVideo = async (req, res) => {
  try {
    const video = new Video(req.body);
    const saved = await video.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
