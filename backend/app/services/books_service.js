const { ObjectId } = require("mongodb");

class BookService {
  constructor(client) {
    this.col = client.db("contactbook").collection("books");
  }

  async getAllBooks(data) {
    let filter = {};
    if (data.name) {
      filter = { $text: { $search: data.name } };
    }
    const books = await this.col.aggregate([{ $match: filter }]).toArray();
    return books;
  }
  async getBookById(id) {
    const book = await this.col.findOne({
      _id: new ObjectId(id),
    });
    return book;
  }
  async deleteBook(id) {
    const data = await this.col.findOneAndDelete({
      _id: new ObjectId(id),
    });
    return data;
  }

  async updateBook(id, data) {
    const book = await this.col.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      { $set: data },
      {
        returnDocument: "after",
      }
    );
    return book;
  }

  async addBook(data) {
    const book = await this.col.insertOne({
      ...data,
      publisher: new ObjectId(data.publisher),
    });
    return book;
  }
}

module.exports = BookService;
