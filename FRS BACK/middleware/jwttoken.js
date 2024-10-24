const jwt = require('jsonwebtoken');

const jwtTokenForAuthentication = (email,pass) => {
    const token = jwt.sign({ userEmail: email, password: pass, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '72h' });
    return token;
}

const jwtTokenForRegister = (otp, email) => {
    const token = jwt.sign({ otp: otp, email: email }, process.env.SIGNUP_SECRET, { expiresIn: '5m' });
    return token
}

module.exports = {jwtTokenForAuthentication,jwtTokenForRegister};