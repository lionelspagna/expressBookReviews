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
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
