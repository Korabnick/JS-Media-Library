const express = require('express');
const mediaController = require('../controllers/mediaController');
const router = express.Router();

router.post('/', mediaController.createMedia);
router.get('/', mediaController.getMedia);
router.put('/:id', mediaController.updateMedia);
router.delete('/:id', mediaController.deleteMedia);

module.exports = router;