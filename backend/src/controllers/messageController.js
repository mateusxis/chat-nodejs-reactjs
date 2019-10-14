const messageModel = require("../models/Message");

class MessageController {
  static async delete(req, res) {
    const { id } = req.params;

    await messageModel.findByIdAndDelete(id, err => {
      if (err) return res.status(400).json(err);

      return res.status(200).json("Message deleted");
    });
  }

  static async index(req, res) {
    const { id } = req.params;

    await messageModel
      .findById(id, (err, message) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json(message);
      })
      .populate({ path: "userId", select: "nickname" });
  }

  static async show(req, res) {
    await messageModel
      .find({}, (err, messages) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json(messages);
      })
      .populate({ path: "userId", select: "nickname" });
  }

  static async store(req, res) {
    const { message, userId } = req.body;

    await messageModel.create(
      {
        message,
        userId
      },
      (err, message) => {
        if (err) return res.status(400).json(err);

        return res.redirect(303, `./messages/${message._id}`);
      }
    );
  }

  static async update(req, res) {
    const { message, userId } = req.body;

    const { id } = req.params;

    await messageModel.findByIdAndUpdate(
      id,
      { message, userId },
      (err, message) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json(message);
      }
    );
  }
}

module.exports = MessageController;
