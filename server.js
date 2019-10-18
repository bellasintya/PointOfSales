require ('dotenv/config');
const express = require ('express');
const logger  = require ('morgan');
const bodyParser = require ('body-parser');
const cors = require ('cors'); //initialize the cors

const Router = require ('./src/Routes/index');

const server = express ();
const port 	 = 8080;
const nodeEnv = 'Development';

//set up an authorized origin
server.use (cors({
	method: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
	origin: '*'
}));


server.listen (port, () => {
	console.log (`Server is running in port ${port} in ${nodeEnv} Mode`);
});

server.use (logger ('dev'));
server.use (bodyParser.json ());
server.use (bodyParser.urlencoded ({extended: false}));

server.use ('/', Router);

module.exports = server;