const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const https = require("https");

app.use(express.static("profile"));

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');


app.get("/", function(req,res){
  res.render("home");
});

app.post("/", function(req,res){
  let fristName = req.body.name;
  let lastName  = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;

  const data = {
        members: [                                   //making data for mailchip
          {
            email_address : email,
            status         : "subscribed",
            merge_fields: {
              FNAME : fristName,
              LNAME : lastName
            }
          }
        ]
  };
   const jsonData = JSON.stringify(data);
   const url =  "https://us19.api.mailchimp.com/3.0/lists/840a33663e";
   const options = {
       method: "POST",
       auth: "Deepak:e1190dd45b986b80f6a4642ab87ff211-us19"
   }

   const request = https.request(url, options, function(response){
     let status = response.statusCode;

     if(status==200){
      res.render("success");
     }
     else{
       res.render("failure");
     }
   });

   request.write(jsonData);
   request.end();

});




















app.listen(process.env.PORT || 3000, function(req,res){
  console.log("Hi! I am 3000");
})
