// pnr: 2666311911
require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { readdirSync } = require('fs');
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
// Render Static Files on Web
app.use(express.static("static"));
app.use(session({
    secret: "Thisisoursecrets",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-avinash:Avinash123@cluster0.azuhh.mongodb.net/userDB", { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
});
const userDetailSchema = new mongoose.Schema({
    username: String,
    name: String,
    detail: String
});
const userPostSchema = new mongoose.Schema({
    username: String,
    name: String,
    postTitle: String,
    about: String
});
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);
const UserDetail = new mongoose.model("UserDetail", userDetailSchema);
const UserPost = new mongoose.model("UserPost", userPostSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

// Send Html File on get request
app.get('/', function (req, res) {

    UserDetail.find({}, function (err, foundUserDetails) {
        if (req.isAuthenticated()) {
            UserDetail.findOne({ username: req.session.passport.user.username }, function (err, foundUserDetail) {
            
                res.render('index', { temp: null, foundUserDetail: foundUserDetail, foundUserDetails: foundUserDetails, auth: req.isAuthenticated() });
            });
        } else
            res.render('index', { temp: null, foundUser: null, foundUserDetails: foundUserDetails, auth: req.isAuthenticated() });
    });
    
});

app.get("/register", function (req, res) {
    res.render("register", { auth: req.isAuthenticated() });
});

app.post("/register", function (req, res) {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            res.redirect("/register");
        } else {
            passport.authenticate("local", { failureRedirect: '/register', failureMessage: true })(req, res, function () {
                res.redirect("/");
            });
        }
    });
});

app.get("/login", function (req, res) {
    res.render("login", { auth: req.isAuthenticated() });
});

app.post("/login", function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function (err) {
        if (err) {
            res.redirect("/login");
        }
        else {
            passport.authenticate("local", { failureRedirect: '/login', failureMessage: true })(req, res, function () {
                res.redirect("/");
            });
        }
    });
});

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/userDetail', function (req, res) {

    if (req.isAuthenticated()) {
        res.render("userDetail", { auth: req.isAuthenticated() });
    } else {
        res.redirect("/login");
    }
});
app.post('/userDetail', function (req, res) {

    const newUser = new UserDetail({
        username: req.session.passport.user.username,
        name: req.body.name,
        detail: req.body.detail
    });

    newUser.save(function (err) {
        if (err)
            console.log(err);
        else
            res.redirect("/");
    });


});
app.get('/userPost', function (req, res) {

    if (req.isAuthenticated()) {
        res.render("userPost", { auth: req.isAuthenticated() });
    } else {
        res.redirect("/login");
    }
});
app.post('/userPost', function (req, res) {
   
    const newPost = new UserPost({
        username: req.session.passport.user.username,
        name: req.body.name,
        postTitle: req.body.title,
        about: req.body.about
    });
   
    newPost.save(function (err) {
        if (err)
            console.log(err);
        else
            res.redirect("/");
    });

   
});

app.get("/user/:userName", function (req, res) {

    UserDetail.findOne({ username: req.params.userName }, function (err, foundUser) {
        if (foundUser) {
            res.render("user", { foundUser: foundUser, auth: req.isAuthenticated() });
        }
        else {
            console.log("User not found");
        }
    });

});

app.post('/tempFinder', function (req, res) {
    const city = req.body.cityname;
    const apikey = process.env.OPENWEATHER_API_KEY;
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=" + units;

    https.get(url, function (response) {

        response.on("data", function (data) {

            const w = JSON.parse(data);
            const code = w.cod;
            if (code == 200) {

                const temp = {
                    intensity: w.main.temp,
                    city: city,
                    desc: w.weather[0].description,
                }
                UserDetail.find({}, function (err, foundUserDetails) {
                        res.render('index', { temp: temp, foundUser: null, foundUserDetails: foundUserDetails, auth: req.isAuthenticated() });
                });

            }
            else {

                res.redirect("/");
            }
        });

    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on 3000.");
});