const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
        type: DataTypes.ENUM('user', 'moderator', 'admin'),
        defaultValue: 'user',
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
