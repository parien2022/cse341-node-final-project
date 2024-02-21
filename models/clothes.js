
const mongoose = require('mongoose');

const clothesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Clothes = mongoose.model('Clothes', clothesSchema);

module.exports = Clothes;
