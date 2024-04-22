const { ObjectId } = require("mongodb");

class AuthService {
  constructor(client) {
    this.col = client.db("contactbook").collection("users");
  }

  async login(data) {
    const user = await this.col.findOne({
      email: data.email,
    });

    if (!user) {
      return null;
    }

    if (user.password !== data.password) {
      return "Invalid password";
    }

    return user;
  }
  async register(data) {
    const user = await this.col.findOne({
      email: data.email,
    });

    if (user) {
      return "User already exists";
    }

    const insertUser = await this.col.insertOne({
      ...data,
      dateOfBirth: new Date().toISOString(),
      gender: "male",
    });

    if (!insertUser?.acknowledged) {
      return "An error ocurred";
    }

    const result = await this.col.findOne({
      _id: insertUser.insertedId,
    });

    return result;
  }
}

module.exports = AuthService;
