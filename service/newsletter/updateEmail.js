import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export default async function sendUpdateEmail(
  name,
  email,
  title,
  content,
  link
) {
  const mailContent = wrapInTemplate(
    name,
    email,
    title,
    parseContentToHTML(content),
    link
  );
  const mailOptions = {
    from: `"Update - Hey Sainty" <${process.env.APP_EMAIL}>`,
    to: email,
    subject: `${title} - Hey Sainty`,
    html: mailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
}

function parseContentToHTML(content) {
  let html = "";

  content.blocks.forEach((block) => {
    switch (block.type) {
      case "header":
        html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        break;
      case "paragraph":
        html += `<p>${block.data.text}</p>`;
        break;
      case "list":
        if (block.data.style === "ordered") {
          html += "<ol>";
          block.data.items.forEach((item) => {
            html += `<li>${item.content}</li>`;
          });
          html += "</ol>";
        } else if (block.data.style === "unordered") {
          html += "<ul>";
          block.data.items.forEach((item) => {
            html += `<li>${item.content}</li>`;
          });
          html += "</ul>";
        } else if (block.data.style === "checklist") {
          html += '<ul style="list-style-type: none; padding: 0;">';
          block.data.items.forEach((item) => {
            const checked = item.meta?.checked ? "✅" : "❌";
            html += `<li>${checked} ${item.content}</li>`;
          });
          html += "</ul>";
        }
        break;
      case "code":
        html += `<pre style="background-color: #f4f4f4; padding: 10px; border-radius: 5px;"><code>${block.data.code}</code></pre>`;
        break;
      case "quote":
        html += `
            <blockquote style="border-left: 4px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px;">
              <p>${block.data.text}</p>
              ${
                block.data.caption ? `<cite>— ${block.data.caption}</cite>` : ""
              }
            </blockquote>
          `;
        break;
      case "table":
        html +=
          '<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">';
        block.data.content.forEach((row) => {
          html += "<tr>";
          row.forEach((cell) => {
            html += `<td>${cell}</td>`;
          });
          html += "</tr>";
        });
        html += "</table>";
        break;
      case "delimiter":
        html += "<hr />";
        break;
      case "raw":
        html += block.data.html;
        break;
      default:
        break;
    }
  });

  return html;
}

function wrapInTemplate(name, email, title, bodyContent, link) {
  return `
       <div
    style="
    font-family: 'Helvetica Neue', Arial, sans-serif, sans-serif;
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
      <p style="font-size: 14px; line-height: 1.7; color: #555555; margin-bottom: 28px;">
        Hope you're doing great! Here's the latest update from 
        <strong>Hey Sainty</strong> that we thought you'd love:
      </p>
  
      <h2 style="color: #111111; font-size: 18px; font-weight: 700; margin-bottom: 18px;">
        ${title}
      </h2>
  
      <div style="margin: 18px 0 30px; font-size: 14px; color: #333333; line-height: 1.7;">
        ${bodyContent}
      </div>
  
      <div style="text-align: center; margin: 40px 0 10px;">
        <a
          href="${link}"
          style="
            background-color: rgba(0, 0, 0, 0.85);
            color: #ffffff;
            padding: 10px 20px;
            border-radius: 10px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            display: inline-block;
          "
        >
          Explore Now
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
  
      `;
}
