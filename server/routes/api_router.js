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

  router.get('/test/', (req, res) => {
    res.status(200).send('Test');
  });

  router.get('/events', async (req, res) => {
    await eventSchema
      .find()
      .then((events) => {
        res.status(200).json(events);
      })
      .catch((err) => console.log(err));
  });

  router.post('/events', async (req, res) => {
    await eventSchema
      .create(req.body)
      .then(() => {
        res.status(200).send('Event created!');
      })
      .catch((err) => console.log(err));
  });

  router.use((req, res) => {
    res.status(404).send('API Not found.');
  });
}

main();

module.exports = router;
