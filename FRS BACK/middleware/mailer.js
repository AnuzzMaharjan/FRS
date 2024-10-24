const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass : process.env.USER_PASS
    }
})
const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: to,
        subject: subject,
        text: text,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error sending mail: ', error);
        }
        console.log('Email sent: ', info.response);
    })
}
module.exports = {sendMail}