const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000; //acces to node.js enviroment variables

const server = http.createServer(app);

server.listen(port); //start the server at this port.