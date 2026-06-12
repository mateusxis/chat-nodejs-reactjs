import { Server } from "socket.io";
import User from "../models/User.js";

export function setupSocket(server) {
  const io = new Server(server);
  const clients = {};

  io.on("connection", (client) => {
    client.on("join", async (loggedUser) => {
      try {
        const user = await User.findByIdAndUpdate(
          loggedUser._id,
          { socket: client.id, active: loggedUser.active },
          { new: true }
        );
        clients[client.id] = user;
        client.emit("update", "You have connected to the server.");
        client.broadcast.emit("update", `${user.nickname} has joined the server.`);
      } catch (err) {
        console.error(err);
      }
    });

    client.on("send", () => {
      client.broadcast.emit("chat");
    });

    client.on("logout", async (user) => {
      try {
        await User.findByIdAndUpdate(user._id, { active: false });
        const nickname = clients[client.id]?.nickname ?? client.id;
        io.emit("update", `${nickname} has left the server.`);
        delete clients[client.id];
      } catch (err) {
        console.error(err);
      }
    });

    client.on("disconnect", () => {
      const nickname = clients[client.id]?.nickname ?? client.id;
      io.emit("update", `${nickname} has left the server.`);
      delete clients[client.id];
    });
  });
}
