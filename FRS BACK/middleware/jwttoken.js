const jwt = require('jsonwebtoken');

const jwtTokenForAuthentication = (email,role) => {
    const token = jwt.sign({ userEmail: email, role: role }, process.env.JWT_SECRET, { expiresIn: '72h' });
    return token;
}

const jwtTokenForRegister = (otp, email) => {
    const token = jwt.sign({ otp: otp, email: email }, process.env.SIGNUP_SECRET, { expiresIn: '5m' });
    return token
}

const verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
            return { valid: false, message: "Token Expired" };
        }
        return { valid: true, decodedToken };
    } catch (err) {
        return { valid: false, message: err.message };
    }
}

module.exports = {jwtTokenForAuthentication,jwtTokenForRegister,verifyToken};