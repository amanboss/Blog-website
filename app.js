//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const homeStartingContent = "Keeps your mind clear and your thoughts organized When you keep a journal with daily entries, your thoughts are all stored in on place. You don’t have to think about where you put the sticky note with your assignment written on it. You also don’t have to waste time remembering when the next office meeting is, or the deadline for a particular project. Having a journal helps you achieve that peace of mind you’ve been longing for so."
const aboutContent= "Welcome to The Daily Journal – your online destination for journaling and organizing your thoughts. Our platform empowers you to express yourself freely, explore your emotions, and gain clarity in life. Start journaling today and embark on a journey of self-discovery!";
const contactContent = "We'd love to hear from you! Reach out to us at.";
 
mongoose.connect("mongodb://localhost:27017/postblogdb")

const postSchema={
  title: String,
  content: String
}

const Post = mongoose.model("Post",postSchema)

app.get("/", async (req,res)=>{
  const newPost= await Post.find({})
  res.render("home",{
    startingContent : homeStartingContent,
    posts:newPost
  })
})

app.get("/about",(req,res)=>{
  res.render("about",{
    aboutContent:aboutContent
  })
})

app.get("/contact",(req,res)=>{
  res.render("contact",{
    contactContent :contactContent 
  })
})

app.get("/compose",(req,res)=>{
  res.render("compose")
})

app.post("/compose",(req,res)=>{
  const newPost=new Post({
    title:req.body.postTitle,
    content:req.body.postBody
  })
  newPost.save()
  res.redirect("/")
})

app.get("/posts/:postId",async (req,res)=>{
  const requestedId= req.params.postId
  const newPost= await Post.findOne({_id:requestedId})
  res.render("post",{
    title:newPost.title,
    content:newPost.content
  })
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
