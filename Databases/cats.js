const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app");

// a plan for what a cat looks like

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);
/*
var george = new Cat({
   name: "George",
   age: 11,
   temperament: "Grouchy"
});


george.save(function(error, cat){
    if ( error) {
        console.log("Error occured");
    } else {
        console.log("Data stored in the DB");
        console.log(cat);
    }
});


*/


Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(error, cat){
    if ( error ) {
        console.log(error);
    } else {
        console.log(cat);
    }
});

Cat.find({}, function(error, cats){
   if (error) {
       console.log("Error occured");
       console.log(error);
   } else {
       console.log("Showing the cats");
       console.log(cats);
   }
});