const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
