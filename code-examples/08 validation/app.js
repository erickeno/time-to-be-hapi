'use strict';
/*
Demos of request validation

A request to http://localhost:3000/path/glenn will return 'Hello, glenn!'
A request to http://localhost:3000/query?name=glenn will return 'Hello, glenn!'
A request to http://localhost:3000/headers with header x-name=glennn will return 'Hello, glenn!'
A POST request to http://localhost:3000/payload with JSON body { "name": "glenn" } will return 'Hello, glenn!'
*/

const Hapi = require('hapi');
const Joi = require('joi');
const Blipp = require('blipp');
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000
});

server.route([{
    method : 'GET',
    path : '/path/{name}',
    config : {
    	handler: (request, reply) => {
            reply('Hello, ' + request.params.name + '!');
        },
    	validate: {
    	    params: {
    	        name: Joi.string().required()
    	    }
    	}
    }
},{
    method : 'GET',
    path : '/query',
    config : {
    	handler: (request, reply) => {
            reply('Hello, ' + request.query.name + '!');
        },
    	validate: {
    	    query: {
    	        name: Joi.string().lowercase()
    	    }
    	}
    }
},{
    method : 'GET',
    path : '/headers',
    config : {
    	handler: (request, reply) => {
            reply('Hello, ' + request.headers['x-name'] + '!');
        },
    	validate: {
    	    headers: Joi.object({
    	        'x-name': Joi.string().required()
    	    }).unknown()
    	}
    }
},{
    method : 'POST',
    path : '/payload',
    config : {
    	handler: (request, reply) => {
            reply('Hello, ' + request.payload.name + '!');
        },
    	validate: {
    	    payload: Joi.object({
    	        'name': Joi.string().required()
    	    })
    	}
    }
}]);


server.register([Blipp], (err) => {

    server.start(() => {

        console.log('Server running at:', server.info.uri);
    });
});

