import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, dob, message, saved, baptized, confirmed, ministry } = req.body;

  if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email, // emails sent to yourself
    subject: `New Membership Form Submission from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
DOB: ${dob}
Saved: ${saved}
Baptized: ${baptized}
Confirmed: ${confirmed}
Ministry: ${ministry}

Message:
${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
}
v

