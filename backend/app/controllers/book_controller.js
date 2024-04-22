const ApiError = require("../api-error");
const BookService = require("../services/books_service");
const MongoDB = require("../utils/mongodb.util");

exports.getAllBooks = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const documents = await bookService.getAllBooks(req.query);
    return res.status(200).json(documents);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving favorite contacts")
    );
  }
};
exports.getBookById = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);

    const document = await bookService.getBookById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Book not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving book with id=${req.params.id}`)
    );
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.deleteBook(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Book not found"));
    }
    return res.send({ message: "Book was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete book with id=${req.params.id}`)
    );
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.updateBook(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Book not found"));
    }
    return res.send({ message: "Book was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not updated book with id=${req.params.id}`)
    );
  }
};
exports.addBook = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.addBook(req.body);

    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error ocurred while creating the contact")
    );
  }
};
