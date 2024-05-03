require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const _ = require("lodash");
const { format } = require('date-fns');

const data = [];
const { signup } = require("./public/js/mail");
const { processFiles } = require("./utils/utils");
// const axios = require("axios");
const homemodel = require("./schema/homeschema");
const multer = require("multer");

const app = express();
app.use(express.static("public"));

const path = require("path");

app.use(express.static(path.join(__dirname, 'public')));

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
  conference_created: {
    type : String,
    default : null
  },
  conference_enrolled: {
    type : String,
    default : null
  },
  paperid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PDF",
    default: null,
  },
});

userschema.plugin(passportlocalmongoose);

const usermodel = mongoose.model("records", userschema);

passport.serializeUser(usermodel.serializeUser());
passport.deserializeUser(usermodel.deserializeUser());


passport.use(usermodel.createStrategy());

// pdf upload logic
const pdfSchema = new mongoose.Schema({
  name: String,
  track: String,
  status: {
    type : String,
    default : "Not Assigned"
  },
  author : String,
  reviewer : {
    type : String,
    default : "Not Assigned"
  },
  conference : String
});

const PDF = mongoose.model("PDF", pdfSchema);

////////////////////////////////////
// for home page
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


////for new conferences
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
    .then(async (result) => {
      async function formatDate(date) {
        for (let i = 0; i < date.length; i++) {
          const newdate = format(date[i], "dd/MM/yyyy");
          date[i] = newdate;
        }
      }
      await formatDate(result.date);

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

///////////////////////////////////////////////

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
//////////////////////////////////////////////////////////
app.get("/committee/:conf", (req, res) => {
  var a = req.params.conf;
  async function findData() {
    try {
      const result = await homemodel.findOne({
        eventname: _.upperCase(a).replace(/\s/g, ""),
      });
      return result;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  findData()
    .then((result) => {
      res.render("committee.ejs", { data: result });
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

//////////////////////////////////////
app.get("/admin/:conf", async(req, res) => {
  if (req.isAuthenticated()) {

    var x = await usermodel.findOne({username : req.user.username});
    console.log(x);
    var author = await usermodel.find({ conference_enrolled: x.conference_created });
    var speaker = await homemodel.findOne({eventname : x.conference_created});
    var paper = await PDF.find({ conference : x.conference_created });

    
    // console.log("author : ",author);
    // console.log("speaker : ",speaker.speakername);
    // console.log("paper : ",paper);

    res.render("admin-dashboard.ejs", { data: req.params.conf });
  } else res.redirect("/login1/" + req.params.conf);
});

app.get("/admin-schedule/:conf", (req, res) => {
  res.render("admin-schedule.ejs",{data : req.params.conf});
});

app.get("/reviewer/:conf", (req, res) => {
  res.render("reviewer-dashboard.ejs", { data: req.params.conf });
});


////////////////////////////////////////
app
  .route("/create-event/:conf")
  .get((req, res) => {
    res.render("create-event.ejs", { data: req.params.conf });
    // res.render("create-event");
  })
  .post(multipleUpload, async (req, res) => {
    // to access each object in an array
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
      numberofmembers: req.body.noofmembers,
      membername: req.body.membername,
      memberimages: memimg,
      facebooklink: req.body.facebooklink,
      twitterlink: req.body.twitterlink,
      instagramlink: req.body.instagramlink,
      tracksname: req.body.tracksname,
      nooftracks: req.body.nooftracks,
      tracksmembername: req.body.tracksmembername,
      tracksmemberimages: req.body.tracksmemberimages,
      tracksfacebooklink: req.body.tracksfacebooklink,
      trackstwitterlink: req.body.trackstwitterlink,
      trackslinkedinlink: req.body.trackslinkedinlink,
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

    await data.save();

    console.log(req.user);

    res.redirect("/create-event/" + req.params.conf);
  });

app.route("/attendee/:conf").get((req, res) => {
  if(req.isAuthenticated())
  {
    res.render("attendee.ejs", { data: req.params.conf });
  }
  else 
    res.render("login1.ejs",{data : req.params.conf});
});

////////////////////////////////

app
  .route("/otp/:conf")
  .get((req, res) => {
    res.render("otp.ejs", { data: req.params.conf });
  })
  .post(async (req, res) => {
    console.log(req.body.otp);
    await signup(req.body.otp, req.body.username);
    res.redirect("/otp" + req.params.conf);
  });

/////////////////////////
app.get("/tracks/:conf", (req, res) => {
  res.render("tracks", { data: req.params.conf });
});


//////////////////////////////////
app
  .route("/paper_submission/:conf")
  .get(async (req, res) => {
    if (req.isAuthenticated()) {
      var t = await homemodel.findOne({eventname: req.params.conf});
      res.render("paper_submission.ejs", { data: req.params.conf , tracks : t});
    } else res.redirect("/login1/" + req.params.conf);
  })
  .post(upload.single("files"), async (req, res) => {

    const pdf = new PDF({
      name: req.file.originalname,
      track: req.body.track,
      author : req.user.username,
      conference : req.params.conf
    });

    const savepdf = await pdf.save();

    await usermodel.findOneAndUpdate(
      { username: req.user.username },
      { paperid: savepdf._id }
    );

    res.redirect("/paper_submission/" + req.params.conf);
  });

////////////////////////////////////

app.route("/delete_paper/:conf")
.post(async(req,res)=>{
  if(req.body.action == "yes")
  {
    await usermodel.findOneAndUpdate({username : req.user.username},{paperid : null});

    await PDF.findByIdAndDelete({_id : req.body.pdfid});
  }
  res.redirect("/check-status/"+req.params.conf);
});


app
  .route("/mail")
  .get(function (req, res) {
    res.render("mail.ejs");
  })
  .post(signup);

  ////////////////////////////////////////////////
 
app
  .route("/signup1/:conf")
  .get((req, res) => {

    res.render("signup1.ejs", {
      data: req.params.conf,
      user: req.query.username,
      error: "",
    });
  })
  .post((req, res) => {
    var r = req.body.role;
    var c = null;
    var e = req.params.conf;
    if(req.params.conf == "CONFOEASE")
    {
      r = "admin";
      e = null;
    }
    usermodel.register(
      {
        name: req.body.name,
        username: req.body.username,
        conference_enrolled : e,
        conference_created: c,
        role: r,
      },
      req.body.password,
      function (err, user) {
        if (err) {
          console.log(err);
          res.render("signup1.ejs", {
            data: req.params.conf,
            user: req.body.username,
            error: "User already exists",
          });
        } else {
          res.redirect("/login1/" + req.params.conf);
        }
      }
    );
  });
  
  /////////////////////////////////////////////////

app
  .route("/login1/:conf")
  .get((req, res) => {
    res.render("login1.ejs", { data: req.params.conf, error: "" });
  })
  .post(async (req, res) => {
    const user = new usermodel({
      username: req.body.username,
      password: req.body.password,
    });
    await req.login(user, async function (err) {
      if (err) {
        console.log(err);
      } else {
        await passport.authenticate("local", function (err, user, info) {
          if (err) console.log(err);
          if (!user) {
            console.log("not user");
            res.render("login1.ejs", {
              data: req.params.conf,
              error: "user does not exists",
            });
          } else {
              usermodel.findOne({ username: req.body.username }).then(async (result) => {
              if(result.role == "admin" && req.params.conf == "CONFOEASE")
              {
                res.redirect("/admin/"+req.params.conf);
              }
              else 
              {
                if(result.role == "author" && result.conference_enrolled == req.params.conf)
                {
                  res.redirect("/paper_submission/"+req.params.conf);
                }
                else if(result.role == "attendee" && result.conference_enrolled == req.params.conf)
                {
                  res.redirect("/attendee/"+req.params.conf);
                }
                else if(result.role == "reviewer" && result.conference_enrolled == req.params.conf)
                {
                  res.redirect("/reviewer/"+req.params.conf);
                }
                else
                {
                  await req.session.destroy();
                  res.render("login1.ejs", {data : req.params.conf , error : "user does not exists"});
                }          
              }
            });
          }
        })(req, res);
      }
    });
  });



app.get("/edit-event/:conf", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("edit-event.ejs", { data: req.params.conf });
  } else res.redirect("/login1/" + req.params.conf);
});

/////////////////////////////////////////////////

app.get("/logout/:conf", (req, res) => {
  let a = req.params.conf;
  if (req.isAuthenticated()) {
    // Destroy the session to log out the user
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.redirect("/login1/" + a); // Redirect to the login page after logout
      }
    });
  } else res.redirect("/login1/" + a);
});

/////////////////////////////////////////////////

app.route("/check-status/:conf").get((req, res) => {
  if (req.isAuthenticated()) {
    usermodel.findOne({username : req.user.username}).then((result) => {
      if(result)
      {
        if(result.paperid != null)
        {
          PDF.findOne({_id : result.paperid}).then((r)=>{
            if(r)
            {
              res.render("check-status.ejs", { data: req.params.conf , pdfname : r.name , pdfid : r._id});
            }
          });
        }
        else
        {
          res.render("check-status.ejs", { data: req.params.conf , pdfname : "" , pdfid : null});
        }
      }
    });
    
  } else res.redirect("/login1/" + req.params.conf);
});


app.listen(8000, () => {
  console.log("Server running on port 8000!!");
});
