const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter

  // console.log(options);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // console.log(options, transporter);

  // 2) Define the email options
  const mailOptions = {
    from: '"Pranav N" <panspit06@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
    html: `<p>${options.message}</p>`, // plain text body
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
