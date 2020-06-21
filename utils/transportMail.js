require("dotenv").config({ path: "../env" });
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const Mailer = ({
  from,
  to,
  subject,
  text,
  url,
  temp,
  userName,
  date,
  time,
  serviceName,
  employeeName,
}) => {
  let transporter = nodemailer.createTransport({
    // host: "mail.privateemail.com",
    // port: 587,
    // secure: false,
    // true for 465, false for other ports
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.resolve("./views/"),
      layoutsDir: path.resolve("./views/"),
      defaultLayout: "",
    },
    viewPath: path.resolve("./views/"),
    extName: ".hbs",
  };

  transporter.use("compile", hbs(handlebarOptions));

  let mailOptions = {
    from, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    template: temp,
    context: {
      to,
      url: url,
      userName,
      serviceName,
      employeeName,
      date,
      time,
    },
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
