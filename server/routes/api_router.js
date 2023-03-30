const express = require("express");
const router = express.Router();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const roomSchema = require("../db/models/room");
const eventSchema = require("../db/models/event");

/**
 * Main routes.
 */
async function main() {
  // Setup Swagger UI
  router.use("/", swaggerUi.serve);
  router.get("/", swaggerUi.setup(swaggerDocument));

  router.get("/login", (req, res) => {
    res.status(200).send("200");
  });

  router.get("/rooms", async (req, res) => {
    await roomSchema
      .find()
      .then(rooms => {
        res.status(200).json(rooms);
      })
      .catch(err => console.error(err));
  });

  router.post("/rooms", async (req, res) => {
    await roomSchema
      .create(req.body)
      .then(() => {
        res.status(200).json(req.body);
      })
      .catch(err => {
        console.error(err);
      });
  });

  router.get("/rooms/:room_id/events", async (req, res) => {
    await eventSchema
      .find({ admin_id: req.params.room_id })
      .then(rooms => {
        res.status(200).json(rooms);
      })
      .catch(err => console.error(err));
  });

  router.get("/events", async (req, res) => {
    await eventSchema
      .find()
      .then(events => {
        res.status(200).json(events);
      })
      .catch(err => console.error(err));
  });

  var max = 0;

  max = await eventSchema
    .find({})
    .sort({ event_id: -1 })
    .limit(1)
    .then(data => {
      return data[0].event_id;
    })
    .catch(err => {
      return 0;
    });

  var counter = max + 1;

  router.post("/events", async (req, res) => {
    var event = req.body;
    console.log(req.body)
    event.event_id = counter;
    event = await eventSchema
      .create(event)
      .then(() => {
        counter++;
        res.status(200).json(event);
      })
      .catch(err => {
        console.error(err);
      });
  });

  router.put("/events", async (req, res) => {
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
      .then(event => {
        res.status(200).json(event);
      })
      .catch(err => {
        console.error(err);
      });
  });

  router.delete("/events/:event_id", async (req, res) => {
    await eventSchema
      .findOneAndDelete({
        event_id: req.params.event_id,
      })
      .then(event => {
        res.status(200).json(event);
      })
      .catch(err => {
        console.error(err);
      });
  });

  router.use((req, res) => {
    res.status(404).send("API Not found.");
  });
}

main();

module.exports = router;
