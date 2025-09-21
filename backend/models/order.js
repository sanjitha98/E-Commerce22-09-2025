const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  qty: { type: Number, required: true },
  price: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderItems: [OrderItemSchema],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending','paid','shipped','delivered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);

