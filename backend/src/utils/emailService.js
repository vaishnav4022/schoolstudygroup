import nodemailer from 'nodemailer';
import config from '../config/index.js';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.port === 465,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

export const sendEmail = async ({ to, subject, html, text }) => {
  const message = {
    from: config.email.from,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(message);
};
