const nodemailer = require("nodemailer");

const Mailer = ({ from, to, subject, text, html, url }) => {
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false,
    // true for 465, false for other ports
    // service: "gmail",
    auth: {
      user: "support@zessencefacialandspa.com",
      pass: "nqjxihn722"
    }
  });

  let mailOptions = {
    from, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html
  };
  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent");
    }
  });
};

module.exports = Mailer;
