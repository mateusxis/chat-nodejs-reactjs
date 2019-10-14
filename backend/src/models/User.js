const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true
    },
    socket: {
      type: String
    },
    active: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("User", UserSchema);
