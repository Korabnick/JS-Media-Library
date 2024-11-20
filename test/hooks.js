const sequelize = require('../config/db');

before(async () => {
    // Подключаемся к тестовой базе данных
    await sequelize.sync({ force: true });
    console.log('Тестовая база данных инициализирована');
});

after(async () => {
    // Завершаем соединение после всех тестов
    await sequelize.close();
});
