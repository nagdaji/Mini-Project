require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const {signup} = require("./public/js/mail");

const app = express();
app.use(express.static("public"));
const path = require("path");

const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportlocalmongoose = require("passport-local-mongoose");
const { stringify } = require("querystring");

const csspath = path.join(__dirname, "/public/css");
const jspath = path.join(__dirname, "/public/js");
const imgpath = path.join(__dirname, "/public/image");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/js", express.static(jspath));
app.use("/css", express.static(csspath));
app.use("/image", express.static(imgpath));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(
    "mongodb+srv://kartik:kartik123@cluster0.8ou8ajo.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongo connected"))
  .catch((err) => console.log(err));

const userschema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  interest: String,
  role: String,
  gender: String,
  paperid: {
    type: String,
    default: null,
  },
});

userschema.plugin(passportlocalmongoose);

const usermodel = mongoose.model("records", userschema);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(usermodel.createStrategy());

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/home", (req, res) => {
  res.render("index");
});
app.get("/call-for-paper", (req, res) => {
  res.render("call-for-paper");
});
app.get("/call-for-workshop", (req, res) => {
  res.render("call-for-workshop");
});

app.get("/committee", (req, res) => {
  res.render("committee");
});

app.get("/admin", (req, res) => {
  res.render("admin-dashboard");
});

app.get("/create-event", (req, res) => {
  res.render("create-event");
});

app
  .route("/login")
  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/home");
    } else res.render("login.ejs", { error: "" });
  })
  .post((req, res) => {
    const user = new usermodel({
      username: req.body.username,
      password: req.body.password,
    });

    req.login(user, function (err) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local", function (err, user, info) {
          if (err) console.log(err);
          if (!user) {
            console.log("this is not working");
            res.render("login.ejs", { error: "Invalid User ID or Password" });
          } else {
            res.redirect("/home");
          }
        })(req, res);
      }
    });
  });

app
  .route("/signup")
  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/signup.ejs");
    } else res.render("signup.ejs");
  })
  .post((req, res) => {
    usermodel.register(
      {
        name: req.body.name,
        username: req.body.username,
        interest: req.body.interest,
        role: req.body.role,
        gender: req.body.inlineRadioOptions,
      },
      req.body.password,
      function (err, user) {
        if (err) {
          console.log(err);
          res.redirect("/signup");
        } else {
          res.redirect("/login");
        }
      }
    );
  });

app.listen(8000, () => {
  console.log("Server running on port 8000!!");
});
