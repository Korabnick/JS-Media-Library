const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const session = require('express-session');
const adminRoutes = require('./routes/adminRoutes');
const moderateRoutes = require('./routes/moderateRoutes');
const roleMiddleware = require('./middlewares/roleMiddleware');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Импорт маршрутов
const mediaRoutes = require('./routes/mediaRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');

const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Настройка шаблонизатора EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Установить true, при использовании HTTPS
}));

// Маршруты
app.use('/api/media', authMiddleware.verifyToken, mediaRoutes);
app.use('/api/users', userRoutes);
app.use('/profile', authMiddleware.verifyToken, profileRoutes);
app.get('/', (req, res) => res.render('index'));
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));
app.use('/admin', authMiddleware.verifyToken, roleMiddleware.checkRole(['admin']), adminRoutes);
app.use('/moderate', authMiddleware.verifyToken, roleMiddleware.checkRole(['moderator', 'admin']), moderateRoutes);

module.exports = app;

// // Запуск сервера
// sequelize
//     .sync()
//     .then(() => {
//         app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));
//     })
//     .catch(err => console.log('Ошибка подключения к БД:', err));
