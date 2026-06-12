import express from "express";
import { createServer } from "http";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { setupSocket } from "./config/socket.js";
import { connectDatabase } from "./config/database.js";
import { registerRoutes } from "./routes/index.js";

const swaggerDocument = JSON.parse(
  readFileSync(new URL("./api.json", import.meta.url))
);

const app = express();
const server = createServer(app);

await connectDatabase();
setupSocket(server);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
registerRoutes(app);

const port = Number(process.env.PORT) || 3333;
server.listen(port, "localhost", () => {
  console.log(`Listening on localhost:${port}`);
});
