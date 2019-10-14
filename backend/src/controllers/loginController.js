const userModel = require("../models/User");

class LoginController {
  static async create(res, nickname, socket) {
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

  static async login(req, res) {
    const { nickname, socket } = req.body;

    await userModel.findOne({ nickname, active: true }, (err, loggedUser) => {
      if (err) return res.status(400).json(err);

      if (loggedUser !== null)
        return res
          .status(200)
          .json({ message: "This nickname already exists." });

      return LoginController.create(res, nickname, socket);
    });
  }

  static async logout(req, res) {
    const { nickname, socket } = req.body;

    const { id } = req.params;

    await userModel.findByIdAndUpdate(
      id,
      {
        nickname,
        socket,
        active: false
      },
      (err, user) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json(user);
      }
    );
  }
}

module.exports = LoginController;
