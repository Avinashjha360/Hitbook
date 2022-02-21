const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
// Render Static Files on Web
app.use(express.static("static"));

// Send Html File on get request
app.get('/',function (req,res) {
res.sendFile(__dirname+"/index.html");
});

app.post('/', function (req, res) {
    const city = req.body.cityname;
    const apikey="53fc7a6806831afb49db5ffb8440ab02";
    const units="metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+ apikey +"&units="+units; 

    https.get(url, function (response) {

        response.on("data", function (data) {
            const w = JSON.parse(data);
            const code=w.cod;
            if(code==200)
            {
                const temp = w.main.temp;
            const desc = w.weather[0].description;
            const icon = w.weather[0].icon;
           
            const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            // res.write("<h1>The Temperature in " + city + " is " + temp + "degree celcius</h1>");
            // res.write("<h4>The Current Weather is " + desc + "</h4>");
            // res.write("<img src=" + imgUrl + ">");

            const temp_detail="The Temperature in " + city + " is " + temp + " degree celcius";
            res.render('index',{temp:temp,city:city,desc:desc,imgUrl:imgUrl});
            res.send();
            }
            else
                {
                    res.sendFile(__dirname+"/index.html");
                }
            
            

        })
    });
});





app.get('/index.html',function (req,res) {
    res.sendFile(__dirname+"/index.html");
    });
app.get('/contact.html',function (req,res) {
    res.sendFile(__dirname+"/contact.html");
});
app.get('/about.html',function (req,res) {
    res.sendFile(__dirname+"/about.html");
});
    

app.post('/contactform',function (req,res) {
    const fname =req.body.Name;
    const email=req.body.Email;
    const address = req.body.Address;
    const mobile = req.body.Mobile;
   

    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: fname,
                    EMAIL: email,
                    PHONE:mobile,
                    ADDRESS:address
                }
            }
        ]
    }
    
        const jsonData = JSON.stringify(data);
        const url = "https://us20.api.mailchimp.com/3.0/lists/5ec9213e8b";

        const options = {
            method: "POST",
            auth: "avinashjha360:3cf2943398b314f648595927443e6aea-us20"
        }
     const request = https.request(url,options,function(response){
            response.on("data",function(data){
                code = response.statusCode;
                console.log(code);
                if(code=='200')
                    res.redirect('/contact.html');
                else
                    res.sendFile(__dirname+"/failure.html");

            })
        })
        request.write(jsonData);
        request.end();

        

    });


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on 3000.");
});


// Api key
// 3cf2943398b314f648595927443e6aea-us20
// 5ec9213e8b