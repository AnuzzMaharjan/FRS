const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { sendMail } = require('./mailer');
const { jwtTokenForRegister } = require('./jwttoken');

const generateOTP = (req, res, next) => {
    const otp = crypto.randomInt(100000, 999999);
    const { email } = req.body;
    console.log(email);
        // sendMail(req.body.email, 'OTP for login', `Ignore if not expecting this mail. your login otp is: ---------- ${otp} ---------- . Do not reply!`);

    const token = jwtTokenForRegister(otp, email);

        res.status(200).json({ success: true, message: 'Otp Generated',otp:otp,token:token });

}

const verifyOTP = (req, res, next) => {
    const { otp, email, token } = req.body;
    
    if (!otp) {
        return res.status(400).json({ success:false,message: 'OTP is required' });
    }
    if (!token) {
        return res.status(400).json({ success: false, message: 'Token required' });
    }
    jwt.verify(token, process.env.SIGNUP_SECRET, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, message: err });
        }
        else {
            if (otp !== user.otp) {
                return res.status(400).json({ success: false, message: 'Incorrect Otp' });
            }
            if (email !== user.email) {
                return res.status(400).json({ success: false, message: 'Invalid email' });
            }
            if (otp === user.otp && email === user.email) {
                next();
            }
        }
    })

}

module.exports = {
    generateOTP,
    verifyOTP
}