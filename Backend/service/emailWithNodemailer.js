const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.app_email,
    pass: process.env.app_password,
  },
});

const sendOTPforNewAccount = async (name, email, otp) => {
  try {
    const mailOptions = {
      from: process.env.app_email,
      to: email,
      subject: "Verify Your Email - Hey Sainty",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid black; border-radius: 10px; color: black;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style=" margin: 0;">Hey Sainty</h2>
        </div>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for signing up on <a href="https://hey-sainty.web.app" style=" text-decoration: none;">Hey Sainty</a>! We're thrilled to have you onboard.</p>
        <p>Your One-Time Password (OTP) to verify your email address is:</p>
        <div style="margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${otp}</span>
        </div>
        <p style="margin-bottom: 20px;">Please enter this OTP on the verification page to complete your registration.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 14px;">
          If you did not attempt to sign up on <a href="https://hey-sainty.web.app" style=" text-decoration: underline;">Hey Sainty</a>, you can safely ignore this email.
        </p>
        <p>Thank you</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const sendOTPforPasswordRecover = async (name, email, otp) => {
  try {
    const mailOptions = {
      from: process.env.app_email,
      to: email,
      subject: "Recover Your Password - Hey Sainty",
      html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid black; border-radius: 10px; color: black;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style=" margin: 0;">Hey Sainty</h2>
        </div>
        <p>Hi <strong>${name}</strong>,</p>
        <p>You have requested to reset your password. Please use the following One-Time Password (OTP) to verify your email address:</p>
        <div style="margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${otp}</span>
        </div>
        <p style="margin-bottom: 20px;">Please enter this OTP on the verification page to complete your password reset.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 14px;">
          If you did not attempt to reset your password, you can safely ignore this email.
        </p>
        <p>Thank you</p>
      </div>
            `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { sendOTPforNewAccount, sendOTPforPasswordRecover };
