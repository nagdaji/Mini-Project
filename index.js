const express = require("express");
const app = express();
app.use(express.static("public"));
const path = require("path");

const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");


const csspath = path.join(__dirname, "/public/css");
const jspath = path.join(__dirname, "/public/js");
const imgpath = path.join(__dirname, "/public/image");
app.use("/js", express.static(jspath));
app.use("/css", express.static(csspath));
app.use("/image", express.static(imgpath));
app.set("view engine", "ejs");
app.set("views", "./views");
app.get('/', (req, res)=>{
    res.render("index");
})
app.get('/home', (req, res)=>{
    res.render("index");
})
app.get('/call-for-paper', (req, res)=>{
    res.render("call-for-paper");
})
app.get('/call-for-workshop', (req, res)=>{
    res.render("call-for-workshop");
})
app.get('/login',(req,res) => {
    res.render("login.ejs");
});
app.get('/signup',(req,res) => {
    res.render("signup.ejs");
});

app.listen(8000, ()=>{
    console.log("Server running on port 8000!!");
})

