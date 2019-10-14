const api = require("../config/api");

class LoginService {
  static async create(id, user) {
    const response = await api.post(`/logout/${id}`, user);

    return response.data;
  }
}

module.exports = LoginService;
