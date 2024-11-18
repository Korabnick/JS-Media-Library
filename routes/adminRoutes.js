const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const MediaItem = require('../models/mediaItem');
const User = require('../models/user');
const router = express.Router();

router.get('/', authMiddleware.verifyToken, async (req, res) => {
    try {
        const users = await User.findAll();
        const media = await MediaItem.findAll();
        res.render('admin', { users, media });
    } catch (error) {
        console.error('Error loading admin panel:', error.message);
        res.status(500).send('Ошибка загрузки панели администратора');
    }
});

router.post('/delete-user/:id', authMiddleware.verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({ where: { id } });
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send('Ошибка удаления пользователя');
    }
});

router.post('/delete-media/:id', authMiddleware.verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        await MediaItem.destroy({ where: { id } });
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send('Ошибка удаления медиа');
    }
});

module.exports = router;
