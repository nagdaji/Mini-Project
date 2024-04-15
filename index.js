require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");

const {signup} = require("./public/js/mail");
const {processFiles , datearr} = require("./utils/utils");


const homemodel = require("./schema/homeschema");
const multer = require("multer");

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


//storage and filename settings//
const storage  = multer.diskStorage({
  destination : "public/uploads",
  filename : function(req,file,cb){
    cb(null,file.originalname);
  }
});

//upload setting//
const upload = multer({
  storage : storage,
});

// for multiple files at a time //
var multipleUpload = upload.fields([{name : 'conferenceimages',maxCount : 5},{name : 'venueimages',maxCount : 5},{name : 'speakerimages',maxCount : 5},{name : 'memberimages',maxCount : 5},{name : 'sponserimage',maxCount : 5}]);

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

app.route("/create-event")
.get((req, res) => {
  res.render("create-event");
})
.post(multipleUpload,(req,res) => {

  // to access each object in an array
  console.log(req.body);
  
  let confimg = processFiles(req.files.conferenceimages);
  let venueimg = processFiles(req.files.venueimages);
  let speakerimg = processFiles(req.files.speakerimages);
  let memimg = processFiles(req.files.memberimages);
  let sponimg = processFiles(req.files.sponserimage);

  // let d = datearr(req.body.date); 


  const data = new homemodel({
    eventname : req.body.eventname,
    conferenceimages : confimg,
    conferencedescription : req.body.conferencedescription,
    date : req.body.date,
    description : req.body.description,
    aim : req.body.aim,
    topic : req.body.topic,
    guidelines : req.body.guidelines,
    preparesubmission : req.body.preparesubmission,
    contact : req.body.contact,
    workshopaim : req.body.workshopaim,
    workshopproposal : req.body.workshopproposal,
    venue : req.body.venue,
    venueimages : venueimg,
    venuedescription : req.body.venuedescription,
    speakername : req.body.speakername,
    speakerimages : speakerimg,
    speakeroccupation : req.body.speakeroccupation,
    committeename : req.body.committeename,
    membername : req.body.membername,
    memberimages : memimg,
    facebooklink : req.body.facebooklink,
    twitterlink : req.body.twitterlink,
    instagramlink : req.body.instagramlink,
    sponsorname : req.body.sponsorname,
    sponsorimage : sponimg,
    headquartername : req.body.headquartername,
    headquarterlink : req.body.headquarterlink,
    mobilenumber : req.body.mobilenumber,
    email : req.body.email,
    facebookconnect : req.body.facebookconnect,
    instagramconnect : req.body.instagramconnect,
    linkedinconnect : req.body.linkedinconnect,
    twitterconnect : req.body.twitterconnect,
  });

  // data.save();

  res.redirect("/create-event");
});

app.get("/signup1")

app.route("/mail")
.get(function(req,res){
  res.render("mail.ejs");
})
.post(signup);
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


  app.get("/edit-event", (req, res) => {
    res.render("edit-event");
  });
  
  app.get("/login1", (req, res) => {
    res.render("login1");
  });
  
  app.get("/signup1", (req, res) => {
    res.render("signup1");
  });
app.listen(8000, () => {
  console.log("Server running on port 8000!!");
});
