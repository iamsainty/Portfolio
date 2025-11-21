import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export default async function AdminCommentReplyEmail(
  name,
  email,
  blogTitle,
  blogPermalink
) {
  const mailOptions = {
    from: `"Notification - Hey Sainty" <${process.env.APP_EMAIL}>`,
    to: email,
    subject: "New Reply on Your Comment on Hey Sainty",
    html: `
        <div
  style="
    font-family: 'Helvetica Neue', Arial, sans-serif;
    width: 600px;
    max-width: 95vw;
    margin: 30px auto;
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    overflow: hidden;
    background-color: #ffffff;
    color: #222222;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  "
>
  <div style="padding: 32px 28px; background-color: #f9fafb;">
    <p style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">
      Hey ${name.split(" ")[0]},
    </p>

    <p style="font-size: 14px; line-height: 1.7; color: #555555; margin-bottom: 18px;">
      Your comment on <strong>${blogTitle}</strong> just received a response from our side. I hope you find it helpful. Feel free to check it out and if you have anything more to share or ask, we would love to hear from you.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      <a
        href="https://www.heysainty.com/blog/${blogPermalink}"
        style="
          background-color: rgba(0, 0, 0, 0.85);
          color: #ffffff;
          padding: 12px 26px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
        "
      >
        View Reply
      </a>
    </div>
  </div>

  <div
    style="
      background-color: rgba(0, 0, 0, 0.9);
      color: #dddddd;
      padding: 40px 24px;
      text-align: center;
    "
  >
    <h1 style="font-size: 22px; margin: 0; font-weight: 800;">Hey Sainty</h1>

    <p
      style="
        margin: 10px 0 30px;
        font-size: 13px;
        font-weight: 500;
        opacity: 0.9;
      "
    >
      Tech Insights, Coding Tips & Life Stories
    </p>

    <div style="font-size: 8px; opacity: 0.75; margin: 10px;">
      <a
        href="https://www.heysainty.com/blog"
        style="color: #dddddd; text-decoration: none; margin: 0 8px;"
      >
        Blog
      </a>
      |
      <a
        href="https://www.heysainty.com/page/about"
        style="color: #dddddd; text-decoration: none; margin: 0 8px;"
      >
        About
      </a>
      |
      <a
        href="https://www.heysainty.com/page/contact"
        style="color: #dddddd; text-decoration: none; margin: 0 8px;"
      >
        Contact
      </a>
      |
      <a
        href="https://www.heysainty.com/page/privacy-policy"
        style="color: #dddddd; text-decoration: none; margin: 0 8px;"
      >
        Privacy Policy
      </a>
    </div>

    <div
        style="
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          margin-top: 24px;
          padding-top: 22px;
          font-size: 10px;
          opacity: 0.8;
        "
      >
        <p style="margin: 12px 0 0; opacity : 0.7;">
          This email was intended for <strong style="color: #dddddd;">${email}</strong>.
          If you believe you received it by mistake, contact us.
        </p>
      </div>
  
      <div
        style="
          padding-top: 18px;
          font-size: 12px;
          opacity: 0.7;
        "
      >
        <p style="margin: 0;">
          Sent with &hearts; by <strong>Priyanshu</strong> |
          <a
            href="https://www.heysainty.com"
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
