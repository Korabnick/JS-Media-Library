const jwt = require('jsonwebtoken');

exports.checkRole = (roles) => (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userRole = decoded.role;
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }

    if (!roles.includes(req.userRole)) {
        return res.status(403).json({ error: 'Access denied' });
    }

    next();
};
