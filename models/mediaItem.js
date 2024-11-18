const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user'); // Импорт модели пользователя

const MediaItem = sequelize.define('MediaItem', {
    title: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    progress: { type: DataTypes.INTEGER, defaultValue: 0 },
    userId: { type: DataTypes.INTEGER, allowNull: false }
});

// Связываем MediaItem с User
MediaItem.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(MediaItem, { foreignKey: 'userId' });

module.exports = MediaItem;
