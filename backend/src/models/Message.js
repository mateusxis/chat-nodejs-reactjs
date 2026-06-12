import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    message: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default model("Message", MessageSchema);
