import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    nickname: { type: String, required: true },
    socket: { type: String },
    active: { type: Boolean }
  },
  { timestamps: true }
);

export default model("User", UserSchema);
