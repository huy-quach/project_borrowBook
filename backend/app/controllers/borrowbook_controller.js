const ApiError = require("../api-error");
const BorrowBookService = require("../services/borrowBook.service");
const MongoDB = require("../utils/mongodb.util");

exports.getAll = async (req, res, next) => {
  try {
    const borrowBookService = new BorrowBookService(MongoDB.client);
    const { user_id } = req.query;
    const documents = await borrowBookService.getAll({ user_id });
    return res.status(200).json(documents);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong quá trình truy xuất!!!")
    );
  }
};
exports.getById = async (req, res, next) => {
  try {
    const borrowBookService = new BorrowBookService(MongoDB.client);

    const document = await borrowBookService.getById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy được nhà xuất bản!!!"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi truy xuất sách với id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const borrowBookService = new BorrowBookService(MongoDB.client);
    const document = await borrowBookService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy sách!!!"));
    }
    return res.send({ message: "Sách đã được xóa thành công!!!" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa sách với id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  try {
    const borrowBookService = new BorrowBookService(MongoDB.client);
    const document = await borrowBookService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy sách!!!"));
    }
    return res.send({ message: "Sách đã được cập nhật thành công!!!" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể cập nhật sách với id=${req.params.id}`)
    );
  }
};
exports.add = async (req, res, next) => {
  try {
    const borrowBookService = new BorrowBookService(MongoDB.client);
    const document = await borrowBookService.add(req.body);

    if (document === "Book already borrowed by this user") {
      return next(new ApiError(400, "Book already borrowed by this user"));
    }
      return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi tạo!!!")
    );
  }
};
