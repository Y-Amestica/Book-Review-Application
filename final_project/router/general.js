const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  if (!isValid(username)) {
    return res.status(400).json({ message: "Invalid username format" });
  }
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }
  users.push({ username, password });
  res.status(201).json({ message: "User successfully registered" });
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.json(books);});
  

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
    const book = books[isbn];
  if (book) {
      res.json(book);
  } else {
      res.status(404).json({ message: "Book not found" });
  }
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  
  const booksArray = Object.values(books);

  const booksByAuthor = booksArray.filter(book => book.author === author);

  if (booksByAuthor.length > 0) {
      res.json(booksByAuthor);
  } else {
      res.status(404).json({ message: "Books by author not found" });
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
      const booksArray = Object.values(books);
      const booksByTitle = booksArray.filter(book => book.title === title);
      if (booksByTitle.length > 0) {
        res.json(booksByTitle);
    } else {
        res.status(404).json({ message: "Books by title not found" });
    }
 });

//  Get book review
public_users.get('/reviews/:isbn',async (req, res) => {
  //Write your code here
      const isbn = req.params.isbn;
      await res.send(JSON.stringify(books[isbn].review),null,4);
      });

module.exports.general = public_users;



/*TASK 10, 11, 12*/

/*const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Definir la URL base de la API de libros
const baseUrl = 'http://your-api-url/books';

// Function para obtener todos los libros usando Axios con async-await
const getAllBooks = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching books data");
  }
};

// Function para obtener los detalles del libro por ISBN usando Axios con async-await
const getBookByISBN = async (isbn) => {
  try {
    const response = await axios.get(`${baseUrl}/isbn/${isbn}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching book details by ISBN");
  }
};

// Function para obtener libros por autor usando Axios con async-await
const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(`${baseUrl}/author/${author}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching books by author");
  }
};

public_users.post("/register", (req, res) => {
  // Escriba su código aquí
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  if (!isValid(username)) {
    return res.status(400).json({ message: "Invalid username format" });
  }
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }
  users.push({ username, password });
  res.status(201).json({ message: "User successfully registered" });
});


// Obtener la lista de libros disponibles en la tienda usando async-await con Axios
public_users.get('/', async function (req, res) {
  try {
    const allBooks = await getAllBooks();
    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener detalles del libro basado en el ISBN usando async-await con Axios
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const book = await getBookByISBN(isbn);
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener detalles del libro basado en el autor usando async-await con Axios
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author;
    const booksByAuthor = await getBooksByAuthor(author);
    res.json(booksByAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Function para obtener libros por título usando Axios con async-await
const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${baseUrl}/title/${title}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching books by title");
  }
};

module.exports.general = public_users;
*/