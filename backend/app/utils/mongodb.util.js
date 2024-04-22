const { MongoClient } = require("mongodb");

class MongoDB {
  static connect = async (uri) => {
    if (this.client) return this.client;
    this.client = await MongoClient.connect(uri);
    return this.client;
  };

  get books() {
    return this.client.db("contactbook").collection("books");
  }
}

module.exports = MongoDB;
