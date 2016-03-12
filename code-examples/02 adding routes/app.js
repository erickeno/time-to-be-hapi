'use strict';
/*
Demos server routes

A request to http://localhost:3000/ will return 'Hello, world!'
A request to http://localhost:3000/glenn will return 'Hello, glenn!'
*/

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000
});

server.route([{
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply('Hello, world!');
    }
},{
    method: 'GET',
    path: '/{name}',
    handler: (request, reply) => {
        reply('Hello, ' + request.params.name + '!');
    }
}]);

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

