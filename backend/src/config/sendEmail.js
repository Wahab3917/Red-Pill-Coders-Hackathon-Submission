import {
  NODE_HOST_NAME,
  NODE_PORT,
  NODE_USER,
  NODE_PASS,
  NODE_SERVICE,
} from "./constants.js";
import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: NODE_SERVICE,
      secure: true,
      auth: {
        user: NODE_USER,
        pass: NODE_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"NetworQ" <no-reply@networq.com>',
      to,
      subject,
      html,
      text,
    });

    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
