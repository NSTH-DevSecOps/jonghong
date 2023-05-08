const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const eventSchema = require("../db/models/event");

const authJwt = require("../middlewares/authJwt");

/**
 * Main routes.
 */
async function main() {
  // Setup Swagger UI
  router.use("/", swaggerUi.serve);
  router.get("/", swaggerUi.setup(swaggerDocument));

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (password === "admin") {
      jwt.sign(
        { id: email, email: email },
        String(process.env.SECRET),
        {
          expiresIn: "5m",
        },
        async (err, token) => {
          console.log(token);
          res.status(200).send({"token": token});
        }
      );
    } else {
      res.status(403).send("UNTHORIZED!");
    }
  });

  router.get("/events", authJwt.verifyToken, async (req, res) => {
    await eventSchema
      .find()
      .then((events) => {
        res.status(200).json(events);
      })
      .catch((err) => console.error(err));
  });

  var max = 0;

  max = await eventSchema
    .find({})
    .sort({ event_id: -1 })
    .limit(1)
    .then((data) => {
      return data[0].event_id;
    })
    .catch((err) => {
      return 0;
    });

  var counter = max + 1;

  router.post("/events", authJwt.verifyToken, async (req, res) => {
    var event = req.body;
    console.log(req.body);
    event.event_id = counter;
    event = await eventSchema
      .create(event)
      .then(() => {
        counter++;
        res.status(200).json(event);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  router.put("/events", authJwt.verifyToken, async (req, res) => {
    await eventSchema
      .findOneAndUpdate(
        { event_id: req.body.event_id },
        {
          $set: {
            event_id: req.body.event_id,
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
          },
        },
        {
          returnDocument: "after",
        }
      )
      .then((event) => {
        res.status(200).json(event);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  router.delete("/events/:event_id", authJwt.verifyToken, async (req, res) => {
    await eventSchema
      .findOneAndDelete({
        event_id: req.params.event_id,
      })
      .then((event) => {
        res.status(200).json(event);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  router.use((req, res) => {
    res.status(404).send("API Not found.");
  });
}

main();

module.exports = router;
