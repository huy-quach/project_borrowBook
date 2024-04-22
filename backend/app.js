const express = require("express");
const ApiError = require("./app/api-error");
const bookRouter = require("./app/routes/books_route");
const publisherRouter = require("./app/routes/publisher_route");
const readerRouter = require("./app/routes/readers_route");
const employeeRouter = require("./app/routes/employee_route");
const borrowBookRouter = require("./app/routes/borrowbook_route");
const authRouter = require("./app/routes/auth_route");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Sử dụng các tuyến đường của ứng dụng
app.use("/api/auth", authRouter);
app.use("/api/book", bookRouter);
app.use("/api/publisher", publisherRouter);
app.use("/api/reader", readerRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/borrow-book", borrowBookRouter);

// Xử lý khi không tìm thấy tài nguyên
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// Xử lý lỗi
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
