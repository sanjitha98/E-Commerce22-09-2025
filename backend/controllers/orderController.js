const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

exports.createOrder = async (req, res) => {
  try {
    const { orderItems } = req.body;
    if(!orderItems || orderItems.length === 0) return res.status(400).json({ message: 'No order items' });
    let total = 0;
     const itemsWithPrice = [];
    for (const item of orderItems) {
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        return res.status(400).json({ message: `Invalid product ID: ${item.product}` });
      }
      const prod = await Product.findById(item.product);
      if (!prod) return res.status(400).json({ message: 'Product not found' });
     
     const orderItem = {
        product: prod._id,
        qty: item.qty,
        price: prod.price  // <-- assign price here
      };
      itemsWithPrice.push(orderItem);
      total += prod.price * item.qty;
    }
    
    const order = await Order.create({
      user: req.user._id,
      orderItems: itemsWithPrice,
      totalPrice: total
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    if(req.user.role === 'admin'){
      const orders = await Order.find().populate('user', 'name email').populate('orderItems.product', 'title price');
      return res.json(orders);
    }
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product', 'title price');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
