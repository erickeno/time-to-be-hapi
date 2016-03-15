'use strict';
/*
Demos server routes

A request to http://localhost:3000/ will return 'Hello, world!'
A request to http://localhost:3000/glenn will return 'Hello, glenn!'
A request to http://localhost:3000/api/glenn will return {"message": "Hello, glenn!"}
A request to http://localhost:3000/api/glenn will return {"message": "Hello, glenn!"}
A request to http://localhost:3000/api/glenn?callback=wrap will return wrap( {"message": "Hello, glenn!"} )
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
},{
    method: 'GET',
    path: '/api/{name}',
    config: {
        handler: (request, reply) => {
            reply({'message': 'Hello, ' + request.params.name + '!'})
                .type('application/json')
                .code(200);
        },
        cors: true,
        jsonp: 'callback'
    }
}]);

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

