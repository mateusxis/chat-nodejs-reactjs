const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
  {
    message: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Message", MessageSchema);
