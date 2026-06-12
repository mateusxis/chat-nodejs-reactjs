import User from "../models/User.js";

export async function login(req, res) {
  const { nickname, socket } = req.body;
  try {
    const existing = await User.findOne({ nickname, active: true });
    if (existing) {
      return res.status(200).json({ message: "This nickname already exists." });
    }
    const user = await User.create({ nickname, socket, active: true });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
}

export async function logout(req, res) {
  const { nickname, socket } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { nickname, socket, active: false },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
}
