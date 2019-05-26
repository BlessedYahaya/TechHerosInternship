var express = require("express");
var app = express();
var request = require("request");


app.set("view engine", "ejs");
app.use(express.static((__dirname + "/public")));

app.get("/", function(req, res){
   res.render("verify");
});

app.get("/verify", function(req,res){
    var bvn = req.query.bvn;
    var url = "https://ravesandboxapi.flutterwave.com/v2/kyc/bvn/" + bvn + "?seckey=FLWSECK-c3072bb9230b0dcdde56db298cd71939-X"
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = {};
             data.fname = JSON.parse(body).data.first_name
             data.lname = JSON.parse(body).data.last_name
             data.dob = JSON.parse(body).data.date_of_birth
             data.phone = JSON.parse(body).data.phone_number
            res.render("results", {data:data})
            
        } else {
        res.send(error);
        }
    });
})


  





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Up");
});

