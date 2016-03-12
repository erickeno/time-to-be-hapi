'use strict';
/*
Demos starting server

Just starts the HAPI server, we have add no routes so a
request to http://localhost:3000 will return a 404 error
*/

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000
});
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});