const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        console.log('No token found in session.');
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Логирование токена
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Invalid token:', error.message);
        return res.status(401).send('Invalid token');
    }
};