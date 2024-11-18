const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.create({ username, password });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        req.session.token = token;

        res.redirect('/');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !await bcrypt.compare(password, user.password)) {
            // Завершаем обработку сразу после отправки ответа
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Сохраняем токен в сессии
        req.session.token = token;
        console.log('Token saved to session:', req.session.token);

        // Перенаправляем на главную страницу
        res.redirect('/');
    } catch (error) {
        // Отправляем ошибку только один раз
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        }
    }
};