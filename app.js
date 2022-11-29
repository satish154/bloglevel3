//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "By not doing the things I knew would make me better — habits like exercising, meditating, and creating gratitude lists—I deprived my body and mind of the energy that these types of positive activities create. I felt tired…inside and out. And to make matters worse, my dreams and goals were just slipping away  few years ago I decided to take a different path…to listen to Aristotle and actually work on creating excellence in my life by establishing a positive daily routine.";
const aboutContent = "We care about building a quality product, trusted relationships with our customers, and a sense of community that connects our customers and team with one another.To learn more about our approach to business and work, feel free to hop on over to our Open Blog.";
const contactContent = "Interested in HubSpots software? Just pick up the phone to chat with a member of our sales team.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

let port=process.env.PORT;
if(port==null || port==""){
  port=3000;

}
app.listen(port,function(req,res) 
{
  console.log("Server started on port 3000");
});