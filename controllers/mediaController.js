const MediaItem = require('../models/mediaItem');

exports.createMedia = async (req, res) => {
    try {
        const { title, type, status, progress } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                status: false,
                error: 'Bad Request',
                message: 'User ID is required',
            });
        }

        if (!title || !type || !status || progress === undefined) {
            return res.status(400).json({
                status: false,
                error: 'Bad Request',
                message: 'Все поля обязательны для заполнения',
            });
        }

        const media = await MediaItem.create({
            title,
            type,
            status,
            progress,
            userId,
        });

        res.status(201).json({
            status: true,
            message: 'Медиа успешно создано',
            data: media,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: 'Internal Server Error',
            message: 'Ошибка при создании медиа',
        });
    }
};

exports.getMedia = async (req, res) => {
    try {
        const media = await MediaItem.findAll();
        if (media.length === 0) {
            return res.status(404).json({
                status: false,
                error: 'Not Found',
                message: 'Медиа не найдены',
            });
        }
        res.status(200).json({
            status: true,
            message: 'Медиа успешно получены',
            data: media,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: 'Internal Server Error',
            message: 'Ошибка при получении медиа',
        });
    }
};

exports.updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await MediaItem.findByPk(id);

        if (!media) {
            return res.status(404).json({
                status: false,
                error: 'Not Found',
                message: 'Медиа не найдено',
            });
        }

        await media.update(req.body);
        res.status(200).json({
            status: true,
            message: 'Медиа успешно обновлено',
            data: media,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: false,
            error: 'Bad Request',
            message: 'Ошибка при обновлении медиа',
        });
    }
};

exports.deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await MediaItem.findByPk(id);

        if (!media) {
            return res.status(404).json({
                status: false,
                error: 'Not Found',
                message: 'Медиа не найдено',
            });
        }

        await media.destroy();
        res.status(204).json({
            status: true,
            message: 'Медиа успешно удалено',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: 'Internal Server Error',
            message: 'Ошибка при удалении медиа',
        });
    }
};
