const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.app_email,
    pass: process.env.app_password,
  },
});

async function sendOTP(email, otp) {
  const mailOptions = {
    from: process.env.app_email,
    to: email,
    subject: "Verify your email",
    text: `Your OTP is ${otp}`,
    html: `<p>Your OTP is <b>${otp}</b></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true; 
  } catch (error) {
    return false; 
  }
}

module.exports = sendOTP;
