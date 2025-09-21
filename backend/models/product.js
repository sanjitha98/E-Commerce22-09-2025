const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, text: true },
  description: { type: String, text: true },
  price: { type: Number, required: true },
  category: { type: String, default: 'Uncategorized', index: true },
  image: { type: String, default: '' },
  countInStock: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

// text index for search
ProductSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Product', ProductSchema);
