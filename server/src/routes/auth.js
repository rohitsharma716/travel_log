const { Router } = require('express');
const User = require('../models/User');
const router = Router();

router.post('/register', async (req, res, next) => {
    try {
        const { userId, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            return res.status(400).json({ message: 'User ID already exists' });
        }

        const user = new User({
            userId,
            password, // In production, you should hash the password
            visitedPlaces: [],
            bucketList: []
        });

        await user.save();
        res.status(201).json({ userId: user.userId });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { userId, password } = req.body;
        const user = await User.findOne({ userId });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ userId: user.userId });
    } catch (error) {
        next(error);
    }
});

module.exports = router; 