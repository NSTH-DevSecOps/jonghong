const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const eventSchema = require('../db/models/event');

/**
 * Main routes.
 */
async function main() {
  // Setup Swagger UI
  router.use('/', swaggerUi.serve);
  router.get('/', swaggerUi.setup(swaggerDocument));

  router.get('/login', (req, res) => {
    res.status(200).send('200');
  });

  router.get('/events', async (req, res) => {
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

  router.post('/events', async (req, res) => {
    var event = req.body;
    event.event_id = counter;
    event = await eventSchema
      .create(event)
      .then(() => {
        console.log(event);
        counter++;
        res.status(200).json(event);
      })
      .catch((err) => console.error(err));
  });

  // router.put('/events', async (req, res) => {
  //   await eventSchema
  //     .create(req.body)
  //     .then(() => {
  //       res.status(200).send('Event updated!');
  //     })
  //     .catch((err) => console.error(err));
  // });

  router.use((req, res) => {
    res.status(404).send('API Not found.');
  });
}

main();

module.exports = router;
