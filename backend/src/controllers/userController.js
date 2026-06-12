import User from "../models/User.js";

export async function show(req, res) {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json(err);
  }
}

export async function index(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
}

export async function store(req, res) {
  const { nickname, socket } = req.body;
  try {
    const user = await User.create({ nickname, socket, active: true });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
}

export async function update(req, res) {
  const { socket, active } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, { socket, active }, { new: true });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
}

export async function remove(req, res) {
  const { nickname } = req.params;
  try {
    await User.deleteOne({ nickname });
    return res.status(200).json("User deleted");
  } catch (err) {
    return res.status(400).json(err);
  }
}
