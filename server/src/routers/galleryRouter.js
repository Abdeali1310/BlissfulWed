const express = require('express');
const galleryRouter = express.Router();
const Image = require('../models/imageModel');

// Get Images by Event and Optional Category
galleryRouter.get('/:event', async (req, res) => {
  try {
    const { event } = req.params;
    const { category } = req.query;
    const filter = { event };

    if (category) {
      filter.category = category;
    }

    const images = await Image.find(filter);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error });
  }
});

module.exports = galleryRouter;
