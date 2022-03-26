require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
// Render Static Files on Web
app.use(express.static("static"));

// Send Html File on get request
app.get('/', function (req, res) {
    res.render('index', { temp:null});
});

app.post('/', function (req, res) {
    const city = req.body.cityname;
    const apikey = process.env.OPENWEATHER_API_KEY;
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=" + units;

    https.get(url, function (response) {

        response.on("data", function (data) {
            const w = JSON.parse(data);
            const code = w.cod;
            if (code == 200) {
                const temp = w.main.temp;
                const desc = w.weather[0].description;
                const icon = w.weather[0].icon;
                const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

                const temp_detail = "The Temperature in " + city + " is " + temp + " degree celcius";
                res.render('index', { temp: temp, city: city, desc: desc, imgUrl: imgUrl });
                res.send();
            }
            else {
                res.redirect("/");
            }
        })
    });
});


app.get('/contact', function (req, res) {
    res.render("contact");
});
app.get('/about', function (req, res) {
    res.render("about");
});


app.post('/contactform', function (req, res) {
    const fname = req.body.Name;
    const email = req.body.Email;
    const address = req.body.Address;
    const mobile = req.body.Mobile;


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    EMAIL: email,
                    PHONE: mobile,
                    ADDRESS: address
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us20.api.mailchimp.com/3.0/lists/"+process.env.MAILCHIP_CLIENT_ID+"";

    const options = {
        method: "POST",
        auth: "avinashjha360:"+MAILCHIP_API_KEY+""
    }
    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            code = response.statusCode;
            console.log(code);
            if (code == '200')
                res.redirect('/contact.html');
            else
                res.sendFile(__dirname + "/failure.html");

        })
    })
    request.write(jsonData);
    request.end();



});


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on 3000.");
});