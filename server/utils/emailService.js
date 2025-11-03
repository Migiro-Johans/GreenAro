const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendContactConfirmation = async ({ name, email }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for contacting Green Arrow',
    html: `
      <h2>Hello ${name},</h2>
      <p>Thank you for reaching out to Green Arrow. We have received your message and will respond within 24 hours.</p>
      <p>Best regards,<br>Green Arrow Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

exports.sendAlertEmail = async ({ name, email, phone, message, sessionId }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to customer service
    subject: '🚨 Customer Service Alert - Chat Escalation',
    html: `
      <h2>Customer Needs Assistance</h2>
      <p><strong>Session ID:</strong> ${sessionId}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p>Please respond to this customer as soon as possible.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Alert email error:', error);
  }
};