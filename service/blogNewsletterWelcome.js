import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export default async function sendNewsletterWelcome(name, email) {
  const mailOptions = {
    from: `"Welcome - Hey Sainty" <${process.env.APP_EMAIL}>`,
    to: email,
    subject: "You’re In! Thanks for Subscribing to Hey Sainty Blogs",
    html: `
<div
  style="
    font-family: 'Helvetica Neue', Arial, sans-serif;
    width: 600px;
    max-width: 95vw;
    margin: 30px auto;
    border: 1px solid #e0e0e0;
    border-radius: 14px;
    overflow: hidden;
    background-color: #ffffff;
    color: #222222;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  "
>
  <div style="padding: 32px 28px; background-color: #f9fafb;">
    <p style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">
      Hey ${name.split(" ")[0]}!
    </p>

    <p style="font-size: 14px; line-height: 1.7; color: #555555; margin-bottom: 18px;">
      Welcome to the Hey Sainty! We’re excited to have you on board.
    </p>

    <p style="font-size: 14px; line-height: 1.7; color: #555555; margin-bottom: 18px;">
      Here at Hey Sainty, I share everything from in-depth tech tutorials and web development tips to personal stories and experiences. Whether you're here to boost your coding skills, explore new projects, or just enjoy a good read, you’ll find something to spark your interest.
    </p>

    <p style="font-size: 14px; line-height: 1.7; color: #555555; margin-bottom: 28px;">
      For an even more personalized experience, I encourage you to create an account on Hey Sainty. This will unlock exclusive features like saving your favorite posts, keeping track of new content, and diving deeper into everything we offer!
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a
        href="https://hey-sainty.vercel.app/blog"
        style="
          background-color: rgba(0, 0, 0, 0.85);
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
        "
      >
        Explore Blogs
      </a>
    </div>
  </div>

  <div
    style="
      background-color: rgba(0, 0, 0, 0.85);
      color: #dddddd;
      padding: 45px 24px;
      text-align: center;
    "
  >
    <h1 style="font-size: 22px; margin: 0; font-weight: 800;">Hey Sainty</h1>
    <p
      style="
        margin: 14px 0 26px;
        font-size: 13px;
        font-weight: 500;
        opacity: 0.9;
      "
    >
      Tech Tutorials, Lifestyle Inspiration & Stories
    </p>

    <div style="padding-top: 18px; font-size: 12px; opacity: 0.7;">
      <p style="margin: 0;">
        Sent with &hearts; by <strong>Priyanshu</strong> |
        <a
          href="https://hey-sainty.vercel.app"
          style="
            color: #dddddd;
            text-decoration: none;
            font-weight: bold;
          "
        >
          Hey Sainty
        </a>
      </p>
    </div>
  </div>
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
