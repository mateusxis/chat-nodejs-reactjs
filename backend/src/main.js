if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const http = require("http");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const compression = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./api.json.js.js");
const mongoose = require("mongoose");

const socket = require("./config/socket");
const routes = require("./routes");

const app = express();
const server = http.Server(app);

socket(server);

mongoose.connect(
  "mongodb+srv://gyra:gyramais@clusterxis-6owt6.mongodb.net/gyra?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  app.use(require("morgan")("dev"));
}

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes(app);

module.exports = server;
