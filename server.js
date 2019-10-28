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

/*server.use ((req,res, next) => {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Header',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
	if (req.methode ==='OPTIONS'){
		res.header('Access-Control-Allow-Methods','*');
		return form.success(res, 200, response);
	}
	next();
})
*/
server.use ('/', Router);

module.exports = server;