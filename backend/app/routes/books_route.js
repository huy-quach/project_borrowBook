const express = require("express");
const {
  getAllBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/book_controller");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);

router.post("/create", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
