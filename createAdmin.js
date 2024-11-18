const User = require('./models/user');

const createAdminUser = async () => {
    const adminExists = await User.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
        const password = 'admin';
        await User.create({
            username: 'admin',
            password: password,
            role: 'admin'
        });
        console.log('Пользователь с ролью "admin" успешно создан!');
    } else {
        console.log('Пользователь с ролью "admin" уже существует.');
    }
};

const createModeratorUser = async () => {
    const adminExists = await User.findOne({ where: { username: 'moderator' } });
    if (!adminExists) {
        const password = 'moderator';
        await User.create({
            username: 'moderator',
            password: password,
            role: 'moderator'
        });
        console.log('Пользователь с ролью "moderator" успешно создан!');
    } else {
        console.log('Пользователь с ролью "moderator" уже существует.');
    }
};

createAdminUser();
createModeratorUser();
