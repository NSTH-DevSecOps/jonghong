const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
// const compression = require('compression');
// const helmet = require('helmet');

const dbConnector = require("./db/dbConnector.js");
const api_router = require("./routes/api_router.js");

async function createServer() {
  const app = express();

  // app.use(compression());
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: [
        "http://127.0.0.1:5174",
      ],
      methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
    })
  );
  // app.use(helmet());

  app.use(morgan("combined"));

  await dbConnector.connect(String(process.env.MONGODB_URI));

  app.get("/healthz", (req, res) => {
    res.status(200).send("OK");
  });

  // API Routes
  app.use("/api", api_router);

  // Start Server
  let server = await app.listen(process.env.PORT, () =>
    console.log("App listen on port: " + process.env.PORT)
  );

  process.on("SIGINT", () => {
    console.log("Application Terminated!");
    server.close(err => {
      console.log(err);
      process.exit(1);
    });
  });
}

createServer();
