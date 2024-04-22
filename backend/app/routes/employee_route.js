const express = require("express");

const {
  getAll,
  getById,
  add,
  update,
  delete: deleteEmployee,
  login,
  register,
} = require("../controllers/employee_controller");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/", getAll);
router.get("/:id", getById);

router.post("/create", add);
router.put("/:id", update);
router.delete("/:id", deleteEmployee);

module.exports = router;
