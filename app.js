const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
// Render Static Files on Web
app.use(express.static("static"));

// Send Html File on get request
app.get('/',function (req,res) {
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
                    res.redirect('/');
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