const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        await userController.register(req, res);
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        await userController.login(req, res);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
