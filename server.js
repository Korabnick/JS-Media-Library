const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const session = require('express-session');
require('dotenv').config();

// Импорт маршрутов
const mediaRoutes = require('./routes/mediaRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');

const authMiddleware = require('./middlewares/authMiddleware'); // Для защищённых маршрутов

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
    cookie: { secure: false } // Установи true, если используешь HTTPS
}));

// Маршруты
app.use('/api/media', authMiddleware.verifyToken, mediaRoutes); // Защищённые маршруты для медиа
app.use('/api/users', userRoutes);
app.use('/profile', profileRoutes); // Профиль с использованием middleware
app.get('/', (req, res) => res.render('index')); // Главная страница
app.get('/register', (req, res) => res.render('register')); // Страница регистрации
app.get('/login', (req, res) => res.render('login')); // Страница входа

// Запуск сервера
sequelize
    .sync()
    .then(() => {
        app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));
    })
    .catch(err => console.log('Ошибка подключения к БД:', err));
