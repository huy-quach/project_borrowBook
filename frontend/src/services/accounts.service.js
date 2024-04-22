import createApiClient from "./api.service";

class AccountsService {
  constructor(baseUrl = "/api/auth") {
    this.api = createApiClient(baseUrl);
  }
  async login(email, password) {
    try {
      const res = await this.api.post("/login", { email, password });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async register(data) {
    try {
      const res = await this.api.post("/register", {
        email: data.email,
        password: data.password,
        username: data.username,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AccountsService();
