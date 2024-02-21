
const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  method_name: {
    type: String,
    required: true
  },
  issuer: {
    type: String,
    required: true
  },
  card_number: {
    type: String,
    required: true
  },
  expiration_date: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  }
});

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

module.exports = PaymentMethod;
