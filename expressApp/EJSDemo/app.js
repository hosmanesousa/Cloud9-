const express = require('express');
const app = express();

app.use(express.static("public")); // css files

// all of our templates will be ejs
app.set("view engine", "ejs"); // letting the browser know ahead of schedule that all files will be .ejs format

app.get("/", function(req, res){
   res.render("home"); 
});

app.get("/fallinlovewith/:breed", function(req, res){
   var breed = req.params.breed;
   res.render("love", {breeder: breed}); 
});

app.get("/posts", function(req, res) {
   var posts = [
       {
           title: "How he became a billionaire",
           author: "Hosmane"
       },
       {
           title: "The ultimate outlier",
           author: "Luis"
       },
       {
           title: "The accidental genious",
           author:"Sousa"
       }
       ]; 
       
       res.render("posts", {posts : posts});
});

app.get("*", function(req, res){
    res.send("Page not found...");
});


app.listen(process.env.PORT, process.env.IT, function(){
    console.log("Server loaded");
});