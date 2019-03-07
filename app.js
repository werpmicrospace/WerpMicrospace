var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");


mongoose.connect("mongodb+srv://werp:976jQJCeP4bU4ub2@werpindia-9qwtj.mongodb.net/test?retryWrites=true", {
  useNewUrlParser: true
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));

//passport setup/configuration
app.use(require("express-session")({
  secret: "I'm building werp",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//for hiding options when user has logged in or logged Out
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});



app.get("/", function (req, res) {
  res.render("landing.ejs");
});

//AuTH routes
app.get("/register", function (req, res) {
  res.render("register.ejs");
});

app.post("/register", function (req, res) {
  var newUser = new User({
    username: req.body.username
  });
  //register this user using passport
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("register.ejs");
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/");
    });
  });
});

//login routes
app.get("/login", function (req, res) {
  res.render("login.ejs");
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), function (req, res) {
  res.send("Login logic happes here");
});

//logout routes
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, function () {
  console.log("App is running");
});