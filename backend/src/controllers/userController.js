const userModel = require("../models/User");

class UserController {
  static async delete(req, res) {
    const { nickname } = req.params;

    await userMode.deleteOne({ nickname }, err => {
      if (err) return res.status(400).json(err);

      return res.status(200).json("User deleted");
    });
  }

  static async index(req, res) {
    const { id } = req.params;

    await userModel.findById(id, (err, loggedUser) => {
      if (err) return res.status(400).json(err);

      return res.status(200).json(loggedUser);
    });
  }

  static async show(req, res) {
    await userModel.find({}, (err, users) => {
      if (err) return res.status(400).json(err);

      return res.status(200).json(users);
    });
  }

  static async store(req, res) {
    const { nickname, socket } = req.body;

    await userModel.create(
      {
        nickname,
        socket,
        active: true
      },
      (err, user) => {
        if (err) return res.status(400).json(err);

        return res.status(201).json(user);
      }
    );
  }

  static async update(req, res) {
    const { socket, active } = req.body;

    const { id } = req.params;

    await userModel.findByIdAndUpdate(id, { socket, active }, (err, user) => {
      if (err) return res.status(400).json(err);

      return res.status(200).json(user);
    });
  }
}

module.exports = UserController;
