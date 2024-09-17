const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const JWT_SECRET = "access";

let users = [{ "username": "leonardo", "password": "1234" }];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  console.log(username);
  const password = req.body.password;
  console.log(users);
  const user_filtered = users.find((user) => user.username == username);
  let message = "";
  if(user_filtered) {
    if(user_filtered.password == password) {
      const token = jwt.sign({ username: username }, JWT_SECRET);
      req.session.username = username;
      req.session.token = token;
      req.session.authorization = { username: username, accessToken: token };
      message = "Successfully logged, token: " + req.session.token;
    } else {
      message = "Password not valid";
    }
  } else {
    message = "User not found";
  }
  //Write your code here
  return res.status(300).json({message: message});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = req.session.username;
  const review = req.body.review;
  if(!review) {
    return res.status(400).send("Review field is missing");
  }
  const isbn = req.params.isbn;
  let filtered_book = {};
  for(let bookId in books) {
    let book = books[bookId];
    //console.log(book.author);
    if(book.isbn?.includes(isbn)) filtered_book = book;
  }
  let counter = 0;
  //if filtered_book founded
  if(filtered_book) {
    let filtered_review = null;
    
    for(let id_review in filtered_book.reviews) {
      console.log('id_review', id_review);
      let currentReview = filtered_book.reviews[id_review];
      console.log('current review', currentReview);
      if(currentReview.username == username) {
        currentReview.review = { username: username, review: review };
        filtered_review = currentReview;
        filtered_book.reviews[id_review] = currentReview.review;
      }
      counter++;
    }
    if(!filtered_review) {
      console.log('Adding')
      filtered_book.reviews = { ...filtered_book.reviews,  [counter.toString()] : { username: username, review: review } };
    }
  }
  //Write your code here
  return res.status(300).json(filtered_book);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const username = req.session.username;
  const isbn = req.params.isbn;
  let filtered_book = {};

  for(let bookId in books) {
    let book = books[bookId];
    //console.log(book.author);
    if(book.isbn?.includes(isbn)) filtered_book = book;
  }
  
  //if filtered_book founded
  if(filtered_book) {
    
    for(let id_review in filtered_book.reviews) {
      let currentReview = filtered_book.reviews[id_review];
      if(currentReview.username == username) {
        delete filtered_book.reviews[id_review];
        return res.send("Content deleted");
      }
    }
  } else {
    return res.status(404).send("Not found");
  }
  return res.status(404).send("Not found");
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
