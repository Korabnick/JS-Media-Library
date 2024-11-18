const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const MediaItem = require('../models/mediaItem');
const User = require('../models/user');

router.get('/', authMiddleware.verifyToken, async (req, res) => {
    try {
        console.log('User ID from token:', req.userId);

        const user = await User.findByPk(req.userId);
        if (!user) {
            console.error('User not found');
            return res.status(404).send('User not found');
        }

        const media = await MediaItem.findAll({ where: { userId: req.userId } });
        console.log('Media items:', media);

        res.render('profile', { user, media });
    } catch (error) {
        console.error('Error loading profile:', error.message);
        res.status(500).send('Ошибка загрузки профиля');
    }
});

module.exports = router;
