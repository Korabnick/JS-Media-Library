const MediaItem = require('../models/mediaItem');

exports.createMedia = async (req, res) => {
    try {
        const { title, type, status, progress } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        if (!title || !type || !status || progress === undefined) {
            return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
        }

        const media = await MediaItem.create({
            title,
            type,
            status,
            progress,
            userId
        });

        res.status(201).json(media);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMedia = async (req, res) => {
    try {
        const media = await MediaItem.findAll();
        res.json(media);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await MediaItem.findByPk(id);

        if (!media) {
            return res.status(404).json({ error: 'Media item not found' });
        }

        await media.update(req.body);
        res.json(media);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await MediaItem.findByPk(id);

        if (!media) {
            return res.status(404).json({ error: 'Media item not found' });
        }

        await media.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
