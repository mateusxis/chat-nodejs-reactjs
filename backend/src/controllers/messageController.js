import Message from "../models/Message.js";

export async function show(req, res) {
  try {
    const messages = await Message.find({}).populate({ path: "userId", select: "nickname" });
    return res.status(200).json(messages);
  } catch (err) {
    return res.status(400).json(err);
  }
}

export async function index(req, res) {
  const { id } = req.params;
  try {
    const message = await Message.findById(id).populate({ path: "userId", select: "nickname" });
    return res.status(200).json(message);
  } catch (err) {
    return res.status(400).json(err);
  }
}

export async function store(req, res) {
  const { message, userId } = req.body;
  try {
    const created = await Message.create({ message, userId });
    return res.redirect(303, `./messages/${created._id}`);
  } catch (err) {
    return res.status(400).json(err);
  }
}

export async function update(req, res) {
  const { message, userId } = req.body;
  const { id } = req.params;
  try {
    const updated = await Message.findByIdAndUpdate(id, { message, userId }, { new: true });
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json(err);
  }
}

export async function remove(req, res) {
  const { id } = req.params;
  try {
    await Message.findByIdAndDelete(id);
    return res.status(200).json("Message deleted");
  } catch (err) {
    return res.status(400).json(err);
  }
}
