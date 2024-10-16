const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const authToken = authHeader && authHeader.split(' ')[1];
    if (!authToken) {
        res.status(401).json({success:false, message: 'Access Denied' });
    } else {
        jwt.verify(authToken, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Session expired! Please login again!!' });
            } else {
                req.user = user;
                next();
            }
        })
    }

}

module.exports = authenticateToken;