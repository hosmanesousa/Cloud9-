const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");


var friends = ["Adilson", "Walter", "Barros", "Holandes"];

app.get("/", function(req, res) {
   res.render("home"); 
});


app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});


app.post("/addfriend", function(req, res) {
   const newFriend = req.body.newfriend; // name = "newfriendc"
   friends.push(newFriend);
   //res.send("Post route"); 
   res.redirect("/friends");
});


app.get("*", function(req, res) {
   res.render("404: Page not found..."); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running");
});

