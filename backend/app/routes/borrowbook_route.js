const express = require("express");

const {
  getAll,
  getById,
  add,
  update,
  delete: deleteBorrowBook,
} = require("../controllers/borrowbook_controller");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);

router.post("/create", add);
router.put("/:id", update);
router.delete("/:id", deleteBorrowBook);

module.exports = router;
