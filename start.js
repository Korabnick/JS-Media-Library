const app = require('./server');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 3000;

sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
    })
    .catch(err => console.error('Ошибка подключения к БД:', err));
