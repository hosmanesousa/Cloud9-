const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// setting up the database
mongoose.connect("mongodb://localhost/yelp_camp");

// schema
const campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

// make a model to use the schema above designed
const Campground = mongoose.model("Campground", campgroundSchema)
/*
Campground.create({
    name: "The hobbit",
    image: "https://images.unsplash.com/photo-1488441770602-aed21fc49bd5?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
    description: "The hobbit sage has an amazing scenario"
    
}, function(error, campground){
    if ( error ){
        console.log(error);
    } else {
        console.log("Images in place");
        console.log(campground);
    }
});
*/

// tell the server to use bodyParser and pass in an object on it
app.use(bodyParser.urlencoded({extended:true})) // for the use of body parser

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

/*
 const campgrounds = [
        {
         name: "Suwon grounds", image: "https://images.unsplash.com/photo-1468956398224-6d6f66e22c35?auto=format&fit=crop&w=1510&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"  
        },
        {
         name: "tokyo montains", image: "https://images.unsplash.com/photo-1498696815880-6fd23346fe56?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"  
        },
        {
         name: "seoul hills", image: "https://images.unsplash.com/photo-1486758206125-94d07f414b1c?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" 
        }
    ];

*/
app.get("/campgrounds", function(req, res){
    // retrieve the campgrounds from the database
    Campground.find({}, function(error, allCampgrounds){
        if (error) {
            console.log(error)
        } else {
            res.render("campgrounds" , {campgrounds : allCampgrounds});
        }
    })
});


app.post("/campgrounds", function(req, res){
    const name = req.body.name; // get data from the form = req.body
    const image = req.body.image;
    const description = req.body.description;
    // we need to push an object inside an array
    const newCampground = {
                           name : name, 
                           image: image,
                           description: description
                          };
                          
    Campground.create(newCampground, function(error, newlyCreated )
    {
     if ( error) {
        console.log(error);
    } else {
        res.redirect("/campgrounds");
       }
    });                     
    
   // campgrounds.push(newCampground);
  //  res.redirect("/campgrounds"); // default of a redirect is to do it as a get request
    
});



app.get("/campgrounds/news", function(req, res){
   res.render("news"); // form for a new campground
});

// campground/ anything, any single word
app.get("/campgrounds/:id", function( req, res){
    // find the campground with provide ID
    Campground.findById(req.params.id, function(error, foundCampground){
        if ( error) {
            console.log(error);
        } else {
            // render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
  //  res.render("show");
});


app.get("*", function(req, res){
    res.send("404: Page not found...");
});


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server running at 100%"); 
});


//        <h4><%= campgrounds[i].name %></h4>