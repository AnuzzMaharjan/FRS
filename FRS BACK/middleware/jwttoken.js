const jwt = require('jsonwebtoken');

const jwtToken = (email,pass) => {
    const token = jwt.sign({ userEmail: email, password: pass, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

module.exports = jwtToken;