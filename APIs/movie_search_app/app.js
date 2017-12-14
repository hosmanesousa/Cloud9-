const express = require('express');
const app = express();

const request = require("request");

app.set("view engine", "ejs");

// http://www.omdbapi.com/?i=tt3896198&apikey=thewdb

app.get("/", function(req, res) {
   res.render("search"); 
});


app.get("/results", function(req, res) {
    var stateName = req.query.searchquery; // get the name in the <form> name = "" </form>
    
    if ( stateName) {
        var url = "http://www.omdbapi.com/?s=" + stateName + "&apikey=thewdb";
    } else {
         var url = "http://www.omdbapi.com/?s=&apikey=thewdb";
    }
//    console.log(url);
    request(url, function(error, response, body) {
       if ( error) {
           console.log(error);
       } else {
           if ( response.statusCode == 200) {
            const parsedData = JSON.parse(body);
             res.render("results", {data:parsedData});
           }
       }
   }); 
});


app.get("*", function(req, res){
    res.send("Oops, page not found!!!");
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server up and running");
});