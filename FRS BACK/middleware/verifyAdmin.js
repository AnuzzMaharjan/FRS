const jwt = require('jsonwebtoken');
const { verifyToken } = require('./jwttoken');

const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || 'No Token!';
    if (!token) {
        res.status(401).json({ message: "Unauthorized!" });
    } else {
        const verifiedToken = verifyToken(token);
        if (verifiedToken.valid) {
            if (verifiedToken.decodedToken.role === 'admin') {
                next();
            } else {
                res.status(401).json({ message: 'Not a admin' });
            }
        } else {
            res.status(401).json(verifiedToken);
        }
    }
}

module.exports = verifyAdmin;