require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const _ = require("lodash");

const { signup } = require("./public/js/mail");
const { processFiles } = require("./utils/utils");

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
const { resolveObjectURL } = require("buffer");

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
const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//upload setting//
const upload = multer({
  storage: storage,
});

// for multiple files at a time //
var multipleUpload = upload.fields([
  { name: "conferenceimages", maxCount: 10 },
  { name: "venueimages", maxCount: 10 },
  { name: "speakerimages", maxCount: 10 },
  { name: "memberimages", maxCount: 15 },
  { name: "sponserimage", maxCount: 10 },
]);

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
  role: String,
  conference: String,
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
  async function findData() {
    try {
      const result = await homemodel.findOne({ eventname: "CONFOEASE" });
      return result;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  findData()
    .then((result) => {
      res.render("index.ejs", { data: result });
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

// variable front page

app.get("/conference/:newpage", (req, res) => {
  
  var name = req.params.newpage;
  name = _.upperCase(name).replace(/\s/g, "");
  async function findData() {
    try {
      const result = await homemodel.findOne({ eventname: name });
      return result;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  findData()
    .then((result) => {
      res.render("index.ejs", { data: result });
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

/////////////////////////////////
app.get("/call-for-paper", (req, res) => {
  async function findData() {
    try {
      const result = await homemodel.findOne({ eventname: "CONFOEASE" });
      return result;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  findData()
    .then((result) => {
      res.render("call-for-paper.ejs", { data: result });
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

app.get("/call-for-workshop", (req, res) => {
  async function findData() {
    try {
      const result = await homemodel.findOne({ eventname: "CONFOEASE" });
      return result;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  findData()
    .then((result) => {
      res.render("call-for-workshop.ejs", { data: result });
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

app.get("/committee/:conf", (req, res) => {
  var a = req.params.conf;
  async function findData() {
    try {
      const result = await homemodel.findOne({ eventname: _.upperCase(a).replace(/\s/g, "") });
      return result;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  findData()
    .then((result) => {
      console.log(result);
      res.render("committee.ejs", { data: result });
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

app.get("/admin/:conf", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("admin-dashboard.ejs" , {data : req.params.conf});
  } else res.redirect("/login1/"+req.params.conf);
});

app.get("/reviewer", (req, res) => {
  res.render("reviewer-dashboard");
});
app
  .route("/create-event/:conf")
  .get((req, res) => {
    res.render("create-event.ejs" , {data : req.params.conf});
    // res.render("create-event");
  })
  .post(multipleUpload, async (req, res) => {
    // to access each object in an array

    // console.log(req.body);

    let confimg = await processFiles(req.files.conferenceimages);
    let venueimg = await processFiles(req.files.venueimages);
    let speakerimg = await processFiles(req.files.speakerimages);
    let memimg = await processFiles(req.files.memberimages);
    let sponimg = await processFiles(req.files.sponserimage);

    const data = new homemodel({
      eventname: _.upperCase(req.body.eventname).replace(/\s/g, ""),
      conferenceimages: confimg,
      conferencedescription: req.body.conferencedescription,
      date: req.body.date,
      description: req.body.description,
      aim: req.body.aim,
      topic: req.body.topic,
      guidelines: req.body.guidelines,
      papersubmission: req.body.papersubmission,
      contact: req.body.contact,
      workshopaim: req.body.workshopaim,
      workshopproposal: req.body.workshopproposal,
      venue: req.body.venue,
      venueimages: venueimg,
      venuedescription: req.body.venuedescription,
      speakername: req.body.speakername,
      speakerimages: speakerimg,
      speakeroccupation: req.body.speakeroccupation,
      committeename: req.body.committeename,
      numberofmembers : req.body.noofmembers,
      membername: req.body.membername,
      memberimages: memimg,
      facebooklink: req.body.facebooklink,
      twitterlink: req.body.twitterlink,
      instagramlink: req.body.instagramlink,
      tracksname : req.body.tracksname,
      nooftracks : req.body.nooftracks,
      tracksmembername : req.body.tracksmembername,
      tracksmemberimages : req.body.tracksmemberimages,
      tracksfacebooklink : req.body.tracksfacebooklink,
      trackstwitterlink : req.body.trackstwitterlink,
      trackslinkedinlink : req.body.trackslinkedinlink,
      sponsorname: req.body.sponsorname,
      sponsorimage: sponimg,
      headquartername: req.body.headquartername,
      headquarterlink: req.body.headquarterlink,
      mobilenumber: req.body.mobilenumber,
      email: req.body.email,
      facebookconnect: req.body.facebookconnect,
      instagramconnect: req.body.instagramconnect,
      linkedinconnect: req.body.linkedinconnect,
      twitterconnect: req.body.twitterconnect,
    });

    // data.save();

    res.redirect("/create-event");
  });

app.get("/otp", (req, res) => {
  res.render("otp");
});

app
  .route("/mail")
  .get(function (req, res) {
    res.render("mail.ejs");
  })
  .post(signup);
app
  .route("/login1/:conf")
  .get((req, res) => {

    console.log(req.body.params);

    if (req.isAuthenticated()) {
      res.redirect("/admin/"+req.params.conf);
    } else res.render("login1.ejs", { data : req.params.conf });
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
            res.render("login1.ejs", { data: req.params.conf });
          } else {
            res.redirect("/admin/"+req.params.conf);
          }
        })(req, res);
      }
    });
  });

app
  .route("/signup1/:conf")
  .get((req, res) => {

    // if (req.isAuthenticated()) {
    //   res.redirect("/signup1");
    // } else res.render("signup1.ejs");
    res.render("signup1.ejs",{data : req.params.conf});
  })
  .post((req, res) => {

    let a = req.params.conf;
    usermodel.register(
      {
        name: req.body.name,
        username: req.body.username,
        conference : a,    
        role: req.body.role,
      },
      req.body.password,
      function (err, user) {
        if (err) {
          console.log(err);
          res.redirect("/signup1");
        } else {
          res.redirect("/login1");
        }
      }
    );
  });

app.get("/edit-event", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("edit-event.ejs");
  } else res.redirect("/login1");
});

app.get("/logout/:conf", (req, res) => {
  let a = req.params.conf;
  console.log(req.params.conf);
  if (req.isAuthenticated()) {
    // Destroy the session to log out the user
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.redirect("/login1/"+a); // Redirect to the login page after logout
      }
    });
  } else res.redirect("/login1"+a);
});

app.listen(8000, () => {
  console.log("Server running on port 8000!!");
});
