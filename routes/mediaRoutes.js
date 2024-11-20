const express = require('express');
const mediaController = require('../controllers/mediaController');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        await mediaController.createMedia(req, res);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        await mediaController.getMedia(req, res);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        await mediaController.updateMedia(req, res);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await mediaController.deleteMedia(req, res);
    } catch (err) {
        next(err);
    }
});

module.exports = router;