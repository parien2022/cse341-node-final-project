
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  conditions: {
    type: String,
    required: true
  },
});

const orders = mongoose.model('orders', orderSchema);

module.exports = orders;
