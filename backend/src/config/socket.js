const loginService = require("../services/loginService");
const userService = require("../services/userService");

module.exports = server => {
  const io = require("socket.io")(server);
  const clients = {};

  io.on("connection", client => {
    client.on("join", loggedUser => {
      console.log("Joined: " + loggedUser.nickname);

      userService
        .update(client.id, loggedUser)
        .then(user => {
          clients[client.id] = user;

          client.emit("update", "You have connected to the server.");
          client.broadcast.emit(
            "update",
            user.nickname + " has joined the server."
          );
        })
        .catch(err => console.log(err));
    });

    client.on("send", msg => {
      console.log("Message: " + msg.message);
      client.broadcast.emit("chat");
    });

    client.on("logout", user => {
      console.log("Logout");
      loginService
        .update(user._id, user)
        .then(() => {
          io.emit("update", (clients[client.id]  ? clients[client.id].nickname : clients[client.id]) + " has left the server.");
          delete clients[client.id];
        })
        .catch(err => console.log(err));
    });

    client.on("disconnect", () => {
      console.log("Disconnect");
      io.emit("update", (clients[client.id]  ? clients[client.id].nickname : clients[client.id])   + " has left the server.");
      delete clients[client.id];
    });
  });
};
