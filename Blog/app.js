const express = require("express");
const app = express();
const expressSanitizer = require("express-sanitizer");

const methodOverride = require("method-override");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/restful_blog_app");

// app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); // this code must be after bodyParser

app.use(methodOverride("_method"));
 
// Mongoose model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);


// Restful routes
app.get("/", function(req, res){
   res.redirect("/blogs"); 
});

// INDEX route
app.get("/blogs", function(req, res){
    Blog.find({}, function(error, blogs){
        if (error){
            console.log("Error");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE

app.get("/blogs/new", function(req, res){
    res.render("new");
});

app.post("/blogs", function(req, res){
    //sanitize the input
    req.body.blog.body = req.sanitize(req.body.blog.body);
   // create blog
   Blog.create(req.body.blog, function(error, newBlog){
       if (error ) {
           res.render("new");
       } else {
           res.redirect("/blogs");
       }
   });
   // then, redirect to the index
});


// SHOW ROUTE

app.get("/blogs/:id", function(req, res){
   Blog.findById(req.params.id, function(error, foundBlog){
      if ( error) {
          res.redirect("/blogs");
      } else {
          res.render("show", {blog: foundBlog});
      }
   }); 
});


// EDIT Route

app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function( error, foundBlog){
        if ( error ) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// put request updating something
app.put("/blogs/:id", function (req, res) {
        //sanitize the input
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(error, updatedBlog){
        if ( error ) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
})
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(error) {
       if ( error) {
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server ready ...");
});