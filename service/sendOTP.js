import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export default async function sendSignUpOtp(name, email, otp) {
  const mailOptions = {
    from: `"Hey Sainty" <${process.env.APP_EMAIL}>`,
    to: email,
    subject: "Your OTP for Hey Sainty Signup",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; color: #333;">
  <h2 style="text-align: center; color: #000;">Hey Sainty</h2>
  <p>Hi <strong>${name}</strong>,</p>
  <p>Thanks for signing up on <a href="https://hey-sainty.vercel.app" style="color: #007bff; text-decoration: none;">Hey Sainty</a>!</p>
  <p>Your One-Time Password (OTP) is:</p>
  <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; text-align: center; margin: 20px 0; color: #000;">
    ${otp}
  </p>
  <p>Kindly use this OTP to verify your email.</p>
  <p style="color: #d9534f;"><strong>Note:</strong> This OTP is valid only for 10 minutes.</p>
  <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
  <p style="font-size: 13px; color: #666;">
    If you did not request this, please ignore this email.
  </p>
</div>

    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
}
