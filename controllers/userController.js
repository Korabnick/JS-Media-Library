const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({
                status: false,
                error: 'Conflict',
                message: 'Пользователь с таким именем уже существует',
            });
        }

        const user = await User.create({ username, password });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        req.session.token = token;
        console.log('Token saved to session:', token);

        res.status(201).json({
            status: true,
            message: 'Пользователь успешно зарегистрирован и авторизован',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: 'Internal Server Error',
            message: 'Ошибка при регистрации пользователя',
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({
                status: false,
                error: 'Not Found',
                message: `Пользователь с именем ${username} не найден`,
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                status: false,
                error: 'Unauthorized',
                message: 'Неверные учетные данные',
            });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        req.session.token = token;
        console.log('Token saved to session:', req.session.token);

        res.status(200).json({
            status: true,
            message: 'Вход выполнен успешно',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: 'Internal Server Error',
            message: 'Ошибка при входе пользователя',
        });
    }
};
