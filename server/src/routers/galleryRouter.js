const express = require('express');
const galleryRouter = express.Router();
const Image = require('../models/imageModel');

// Get Images by Event and Optional Category/Filter
// Get Images by Event and Optional Category/Filter
galleryRouter.get('/:event', async (req, res) => {
  try {
    const { event } = req.params;
    const { filter } = req.query; // Get filter from query params
    const query = { event };

    // Use 'category' instead of 'tags' for filtering
    if (filter) {
      query.category = filter;
    }

    const images = await Image.find(query);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error });
  }
});


module.exports = galleryRouter;
