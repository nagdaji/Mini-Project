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
    from: `⭐ ConfoEase ⭐ ${process.env.USER}`,
    to: "deepak.2022ca025@mnnit.ac.in",
    subject: "Otp Validation",
    text: "hello world",
    html: ` <div style="background-color: #222; color: #fff; text-align: center; padding: 20px; border-radius: 10px; width: 60%; box-shadow:  0 4px 8px 0 #3867d6, 0 2px 8px 0 #3867d6; margin: auto;">
    <h1 style="color: #3867d6;">ConfoEase</h1>
    <h3>Otp Validation</h3>
    <p>Your OTP for ConfoEase is <b style="color: #3867d6">4568</b>.<br>It is valid for 5 minutes.</p>
  </div>`,
  });
};
module.exports = { signup };
