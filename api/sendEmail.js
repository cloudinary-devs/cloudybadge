const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_KEY
  }
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  subject: 'Start editing your badge with CloudyBadge',
  text: 'Testing'
};

module.exports = (user) => {
  const options = {
    ...mailOptions,
    to: user.email,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}