const nodemailer = require("nodemailer");
require("dotenv").config();

const signup = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.USER,
    to: "kartik.2022ca043@mnnit.ac.in",
    subjest: "otp validation",
    text: "Hello world",
    html: "<b>HELLO WORLD</b>",
  });
};
module.exports = { signup };
