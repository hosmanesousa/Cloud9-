const express = require('express');
const app = express();

// request, response
app.get("/", function(req, res){
    res.send("Welcome to the jungle");
});

app.get("/speak/:animal", function(req, res) {
    var sounds = {
    pig: "oink",
    cow: "moo",
    dog: "woof woof",
    cat: "Meahu",
    goldfish: "rrrr"
}
   var animal = req.params.animal.toLowerCase(); // extract or access the animal
   var sound = sounds[animal];
   res.send("The " + animal + " says " + sound);
});

app.get("/repeat/:message/:times", function(req, res) {
    var message = req.params.message;
    var times = Number(req.params.times);
    var result = "";
    
    for ( var i = 0; i < times; i++) {
        result += message + " ";
    }
    res.send(result);
});

app.get("*", function(req, res){
    res.send("Page not found...");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has loaded");
})

