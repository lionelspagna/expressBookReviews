const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(users);
  const filtered_user = users.find((user) => user?.username == username);
  let message = '';
  if(!filtered_user) {
    users.push({ username: username, password: password });
    message = "The user has been created";
  } else {
    message = "The user already exists";
  }

  return res.status(300).json({ message: message});
});
/*
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here, 300 = list of resources, in this case books
  //return res.status(300).json({message: JSON.stringify(books)});
  return res.status(300).send(JSON.stringify(books));
});
*/
/*
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let filtered_book = {};
  for(let bookId in books) {
    let book = books[bookId];
    //console.log(book.author);
    if(book.isbn?.includes(isbn)) filtered_book = book;
  }
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  return res.status(300).json(filtered_book);
 });
*/ 
public_users.get('/isbn/:isbn',function (req, res) {

  let promise = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    let filtered_book = {};
    for(let bookId in books) {
      let book = books[bookId];
      //console.log(book.author);
      if(book.isbn?.includes(isbn)) filtered_book = book;
      resolve(filtered_book);
    }
  });
  promise.then((resolve) => {
    res.status(300).json(resolve);
  });
 }); 
/*
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let filtered_book = {};
  for(let bookId in books) {
    let book = books[bookId];
    //console.log(book.author);
    if(book.author.includes(author)) filtered_book = book;
  }
  //Write your code here
  return res.status(300).json(filtered_book);
});
*/
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let promise = new Promise((resolve, reject) => {
    const author = req.params.author;
    let filtered_book = {};
    for(let bookId in books) {
      let book = books[bookId];
      //console.log(book.author);
      if(book.author.includes(author)) filtered_book = book;
    }
    resolve(filtered_book);
  });
  promise.then(response => res.status(300).json(response));
});
/*
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filtered_book = {};
  for(let bookId in books) {
    let book = books[bookId];
    //console.log(book.author);
    if(book.title.includes(title)) filtered_book = book;
  }
  //Write your code here
  return res.status(300).json(filtered_book);
});
*/
public_users.get('/title/:title',function (req, res) {

  let promise = new Promise((resolve, reject) => {
    const title = req.params.title;
    let filtered_book = {};
    for(let bookId in books) {
      let book = books[bookId];
      //console.log(book.author);
      if(book.title.includes(title)) filtered_book = book;
    }
    resolve(filtered_book);
  });
  promise.then(response => res.status(300).json(response));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let filtered_book = {};
  for(let bookId in books) {
    let book = books[bookId];
    //console.log(book.author);
    if(book.isbn?.includes(isbn)) filtered_book = book;
  }
  //Write your code here
  return res.status(300).json(filtered_book);
});

public_users.get('/', async(req, res) =>{
  let promise = new Promise((resolve, reject) => {
    resolve(books);
  });
  promise.then(resolve => res.send(resolve));
});

module.exports.general = public_users;
