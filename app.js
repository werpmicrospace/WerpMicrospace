var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");
var Admin = require("./models/admin")
var UserInfo = require("./models/user_info");
var AdminInfo = require("./models/admin_info");
var AdminTask = require('./models/admin_task');
var admin = require('./routes/admin');
var secret = require('./routes/secret');

mongoose.connect("mongodb+srv://werp:976jQJCeP4bU4ub2@werpindia-9qwtj.mongodb.net/microspace?retryWrites=true", {
// mongoose.connect("mongodb://localhost:/werp_v1", {
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

passport.use('user-local', new localStrategy(User.authenticate()));

passport.use('admin-local', new localStrategy(Admin.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// passport.serializeUser(function(user,done){
//     if(isUser())
// })

//SERIALIZE and DESERIALIZE
function SessionConstructor(userId, userGroup, details) {
  this.userId = userId;
  this.userGroup = userGroup;
  this.details = details;
}

// module.exports = function(passport) {

passport.serializeUser(function (userObject, done) {
  // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
  let userGroup = "model1";
  let userPrototype = Object.getPrototypeOf(userObject);

  if (userPrototype === User.prototype) {
    userGroup = "model1";
  } else if (userPrototype === Admin.prototype) {
    userGroup = "model2";
  }

  let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
  done(null, sessionConstructor);
});

passport.deserializeUser(function (sessionConstructor, done) {

  if (sessionConstructor.userGroup == 'model1') {
    User.findOne({
      _id: sessionConstructor.userId
    }, '-password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
      done(err, user);
    });
  } else if (sessionConstructor.userGroup == 'model2') {
    Admin.findOne({
      _id: sessionConstructor.userId
    }, '-password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
      done(err, user);
    });
  }

});

//for hiding options when user has logged in or logged Out
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});



app.get("/", function (req, res) {
  if (req.user) {
    User.findById(req.user.id, function (err, user) {
      if (err) {
        console.log(err);
      } else if (user) {
        res.redirect("/intern/dashboard");
      } else {
        res.redirect("/showtasks");
      }
    });
  } else {
    res.render("login.ejs");
  }
});


app.get("/intern/new", function (req, res) {
  res.render("user_info.ejs");
});

app.post("/interns/new", function (req, res) {
  var Name = req.body.name;
  var College = req.body.image;
  var Email = req.body.email;
  var Password = req.body.password;
  var TeamName = req.body.team;
  var Lead = req.body.lead;
  var newIntern = {
    name: Name,
    college: College,
    email: Email,
    password: Password,
    team: TeamName,
    lead: Lead
  };
  UserInfo.create(newIntern, function (err, intern) {
    if (err) {
      consolelog(err);
    } else {
    }
  })
  res.redirect("/");
});

app.get("/admin/new", function (req, res) {
  res.render("admin_info.ejs");
});

app.post("/admins/new", function (req, res) {
  var Name = req.body.name;
  var Email = req.body.email;
  var Password = req.body.password;
  var TeamName = req.body.team;
  var newAdmin = {
    name: Name,
    email: Email,
    password: Password,
    team: TeamName
  };
  AdminInfo.create(newAdmin, function (err, intern) {
    if (err) {
      consolelog(err);
    } else {
    }
  })
  res.redirect("/");
});

//show admin tasks to interns


//AuTH routes
app.get("/register", function (req, res) {
  res.render("register.ejs");
});

app.get('/secret',(req,res)=>{
  res.render("qwe.ejs");
})

app.post("/register", function (req, res) {
  var asd = req.body.qwe;
  var aa = asd.split("\r\n");
  for (m = 0; m < aa.length; m++) {
    if (aa[m] == "") {
      aa.splice(m, 1);
      m--;
    }
  }
  for (var i = 0; i < aa.length; i++) {
    console.log("username " + aa[i].split("\t")[0]);
    console.log("password " + aa[i].split("\t")[1]);
  

    var newUser = new User({
      username: aa[i].split("\t")[0]
    });
    //register this user using passport
    User.register(newUser,aa[i].split("\t")[1], function (err, user) {
      if (err) {
        console.log(err);
        return res.render("register.ejs");
      }
      // passport.authenticate("user-local")(req, res, function () {
        // console.log(req)
        // res.redirect("/");
      // });
    });
  }
  res.redirect('/')
});

//admin auth
app.get("/admin/register", function (req, res) {
  res.render("adminRegister.ejs");
});

app.post("/admin/register", function (req, res) {
  var newUser = new Admin({
    username: req.body.username
  });
  //register this user using passport
  Admin.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("adminRegister.ejs");
    }
    passport.authenticate("admin-local")(req, res, function () {
      res.redirect("/showtasks");
    });
  });
});

//login routes
app.get("/login", function (req, res) {
  if (!req.user) {
    res.render("login.ejs");
  } else {
    res.redirect("/intern/dashboard");
  }
});

app.post("/login", passport.authenticate('user-local', {
  successRedirect: "/intern/dashboard",
  failureRedirect: "/login"
}), function (req, res) {
  res.send("Login logic happes here");
});

//admin login
app.get("/admin/login", function (req, res) {
  if (req.user) {
    res.redirect("/showtasks");
  } else {
    res.render("adminLogin.ejs");
  }
});

app.post("/admin/login", passport.authenticate('admin-local', {
  successRedirect: "/showtasks",
  failureRedirect: "/admin/login"
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



app.use('/', admin);
app.use('/', secret);

app.listen(process.env.PORT || 3000, function () {
  console.log("App is running");
});
