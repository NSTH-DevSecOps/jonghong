// const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require('morgan');
// const helmet = require('helmet');

const dbConnector = require('./db/dbConnector.js');
const api_router = require('./routes/api_router.js');

async function createServer() {
	const app = express();

	// app.use(compression());
	app.use(bodyParser.json());
	app.use(morgan('combined'));
	app.use(cors({
		origin: true
	}));
	// app.use(helmet());
	

    await dbConnector.connect(process.env.mongodb_url);

	app.get('/healthz', (req, res) => {
        res.status(200).send('OK');
    })

	// API Routes
	app.use('/api', api_router);

	// Start Server
	let server = await app.listen(process.env.port, () => console.log('App listen on port: ' + process.env.port));

	process.on('SIGINT', () => {
		console.log('Application Terminated!')
		server.close((err) => {
			console.log(err)
			process.exit(1)
		})
	})
}

createServer();