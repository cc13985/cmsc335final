const express = require('express');
const router = express.Router();
const axios = require('axios');
const Order = require('../models/Order');

// Home route displaying coffee image and recent orders
router.get('/', async (req, res) => {
    try {
        // API fetching a random coffee image
        const response = await axios.get('https://coffee.alexflipnote.dev/random.json');
        const coffeeImageUrl = response.data.file;

        // Get recent orders (last 10)
        const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10);

        res.render('index', {
            coffeeImageUrl,
            recentOrders,
            error: null
        });
    } catch (err) {
        res.render('index', {
            coffeeImageUrl: null,
            recentOrders: [],
            error: 'Could not load coffee image'
        });
    }
});

// Route to handle new order submissions
router.post('/order', async (req, res) => {
    const { name, drink, size, milk, sugarPercentage, price, notes } = req.body;

    const newOrder = new Order({
        name,
        drink,
        size,
        milk,
        sugarPercentage: Number(sugarPercentage),
        price: Number(price),
        notes: req.body.notes || ''
    });

    try {
        await newOrder.save();
        res.redirect('/');
    } catch (err) {
        console.error('Error saving order:', err);
        try {
            const response = await axios.get('https://coffee.alexflipnote.dev/random.json');
            const coffeeImageUrl = response.data.file;
            const recentOrders = await Order.find().sort({ orderTime: -1 }).limit(10);
            res.render('index', {
                coffeeImageUrl,
                recentOrders,
                error: 'Could not save order'
            });
        } catch (innerErr) {
            res.render('index', {
                coffeeImageUrl: null,
                recentOrders: [],
                error: 'Could not save order'
            });
        }
    }
});

// Route to clear all orders
router.post('/clear-orders', async (req, res) => {
    try {
        await Order.deleteMany({});
        res.redirect('/');
    } catch (err) {
        console.error('Error clearing orders:', err);
        res.redirect('/');
    }
});

module.exports = router;