const api = require("../config/api");

class UserService {
  static async update(socket, { nickname, _id }) {
    const response = await api.put(`/users/${_id}`, {
      socket,
      nickname,
      active
    });

    return response.data;
  }
}

module.exports = UserService;
