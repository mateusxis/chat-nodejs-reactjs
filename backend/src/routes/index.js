const loginRouter = require("./loginRouter");
const messageRouter = require("./messageRouter");
const userRouter = require("./userRouter");

const notFoundRouter = function(req, res) {
  return res.status(404).json({ message: "Recurso não encontrado!" });
};

const invalidRouter = function(req, res) {
  return res.status(400).json({ message: "Requisição inválida!" });
};

module.exports = app => {
  app.use("/api/messages", messageRouter);
  app.use("/api/messages", invalidRouter);

  app.use("/api/users", userRouter);
  app.use("/api/users", invalidRouter);

  app.use("/api", loginRouter);
  app.use("/api", invalidRouter);

  app.use(notFoundRouter);
};
