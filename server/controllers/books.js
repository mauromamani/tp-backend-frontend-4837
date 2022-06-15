const { response } = require('express');
const Book = require('../models/Book');

// Method: POST
// Name: createBook
const createBook = async (req, res = response) => {
  const data = req.body;

  try {
    const newBook = new Book(data);
    await newBook.save();

    res.status(201).json({
      status: 201,
      message: 'book created successfully',
      data: {
        book: newBook,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'internal server error',
    });
  }
};

// Method: GET
// Name: getAllBooks
// Query: { destacado: boolean }
const getAllBooks = async (req, res = response) => {
  const { destacado } = req.query;
  const query = {};

  if (destacado) {
    query.destacado = destacado;
  }

  try {
    const books = await Book.find(query);
    const totalBooks = await Book.countDocuments(query);

    res.status(200).json({
      status: 200,
      data: {
        books,
        total_books: totalBooks,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'internal server error',
    });
  }
};

// Method: PUT
// Name: updateBook
const updateBook = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...data } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedBook) {
      res.status(404).json({
        status: 404,
        message: 'book not found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: 'book updated successfully',
      data: {
        book: updatedBook,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'internal server error',
    });
  }
};

// Method: DELETE
// Name: deleteBook
const deleteBook = async (req, res = response) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).json({
        status: 404,
        message: 'book not found',
      });
      return;
    }

    await Book.deleteOne({ id });

    res.status(200).json({
      status: 200,
      message: 'book deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'internal server error',
    });
  }
};

module.exports = { createBook, getAllBooks, updateBook, deleteBook };
