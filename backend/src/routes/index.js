import loginRouter from "./loginRouter.js";
import userRouter from "./userRouter.js";
import messageRouter from "./messageRouter.js";

const notFound = (req, res) => res.status(404).json({ message: "Recurso não encontrado!" });
const invalid = (req, res) => res.status(400).json({ message: "Requisição inválida!" });

export function registerRoutes(app) {
  app.use("/api/messages", messageRouter);
  app.use("/api/messages", invalid);

  app.use("/api/users", userRouter);
  app.use("/api/users", invalid);

  app.use("/api", loginRouter);
  app.use("/api", invalid);

  app.use(notFound);
}
