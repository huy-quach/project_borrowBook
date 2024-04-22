import createApiClient from "./api.service";

class BorrowBookService {
  constructor(baseUrl = "/api/borrow-book") {
    this.api = createApiClient(baseUrl);
  }
  async create(data) {
    return (await this.api.post("/create", data)).data;
  }

  async getAll(searchQuery = "") {
    return (await this.api.get("/" + "?" + searchQuery)).data;
  }

  async update(id, data) {
    return await this.api.put(`/${id}`, data).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new BorrowBookService();
