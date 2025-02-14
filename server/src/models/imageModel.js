const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    enum: ['pre-wedding', 'wedding', 'reception', 'engagement']
  },
  filePath: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [ 'couple', 'guests', 'family', 'moments','ceremony'],
    default: 'couple'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
