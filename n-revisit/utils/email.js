const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ').at(0);
    this.url = url;
    this.from = `Pranav N <${process.env.EMAIL_FROM} >`;
  }

  transporter() {
    if (process.env.NODE_ENV === 'production') {
      //  SendInBlue
      return nodemailer.createTransport({
        host: process.env.SENDINBLUE_HOST,
        port: process.env.SENDINBLUE_PORT,
        auth: {
          user: process.env.SENDINBLUE_USERNAME,
          pass: process.env.SENDINBLUE_PASSWORD,
        },
      });
    }

    // Mail Trap
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  //Send the actual email
  async send(template, subject) {
    // 1) Render HTML Based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    // 2) Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    // 3) Create a transport and send email
    this.transporter();

    await this.transporter().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(`Welcome`, `Welcome to the Natours Family!`);
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'You password reset token (Valid for 10 mins)'
    );
  }
};

// const sendEmail = async (options) => {
//   // 1) Create a transporter

//   // console.log(options);
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   // console.log(options, transporter);

//   // 2) Define the email options
//   const mailOptions = {
//     from: '"Pranav N"',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     // html:
//     html: `<p>${options.message}</p>`, // plain text body
//   };

//   // 3) Actually send the email
//   await transporter.sendMail(mailOptions);
// };
