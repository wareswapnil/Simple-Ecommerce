const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Create a product
router.post('/', async (req, res) => {
    const { name, price, description, image } = req.body;
    const product = new Product({ name, price, description, image });
    await product.save();
 res.status(201).json(product);
});

module.exports = router;
