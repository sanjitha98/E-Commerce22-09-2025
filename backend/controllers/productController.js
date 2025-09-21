const Product = require('../models/product');
const { validationResult } = require('express-validator');

// create product (admin)
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, image, countInStock } = req.body;
    const product = await Product.create({
      title, description, price, category, image, countInStock, createdBy: req.user._id
    });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// update product (admin)
exports.updateProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if(!p) return res.status(404).json({ message: 'Product not found' });
    Object.assign(p, req.body);
    await p.save();
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// delete
exports.deleteProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if(!p) return res.status(404).json({ message: 'Product not found' });
    await p.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// get single
exports.getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if(!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// list with search, filter, pagination
exports.getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 12;
    const page = Number(req.query.page) || 1;
    const keyword = req.query.keyword ? { $text: { $search: req.query.keyword } } : {};
    const category = req.query.category ? { category: req.query.category } : {};
    const priceMin = req.query.priceMin ? { price: { $gte: Number(req.query.priceMin) } } : {};
    const priceMax = req.query.priceMax ? { price: { $lte: Number(req.query.priceMax) } } : {};
    const filter = { ...keyword, ...category, ...priceMin, ...priceMax };

    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .sort({ createdAt: -1 });

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
