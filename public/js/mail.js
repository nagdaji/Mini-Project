const nodemailer = require("nodemailer");
require("dotenv").config();

const signup = async (req, res) => {
     
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host : "smtp.gmail.com",
        port : 587,
        secure : false,
        auth: {
            user : process.env.USER,
            pass: process.env.APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: {
            name: "ConfoEase",
            address: process.env.USER
        },
        to : ["kartikchander.2000@gmail.com"],
        subjest: "otp validation",
        text: "Hello world",
        html: "<b>HELLO WORLD</b>",
    }

    
    const sendMail = async() =>{
        try{
            await transporter.sendMail(mailOptions)
        }catch (error) {
            console.error(error);
        }
    }

    sendMail(transporter,mailOptions);
}
module.exports = {
    signup
}