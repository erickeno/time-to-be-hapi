'use strict';
/*
Demos adding the inert plugin which servers static content


Post this JSON to http://localhost:3000/batch
{ "requests": [
    {"method": "get", "path": "/users/glenn-jones"},
    {"method": "get", "path": "/places/the-open-house"}
] }

Post this JSON to http://localhost:3000/batch
{ "requests": [
    {"method": "get", "path": "/places/the-open-house"},
    {"method": "get", "path": "/users/$0.author"}
] }

*/

const Hapi = require('hapi');
const Inert = require('inert');
const Blipp = require('blipp');
const Bassmaster = require('bassmaster');
const Routes = require('./lib/routes');
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000
});


const goodOptions = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }]
};


server.register([
    Inert,
    Blipp,
    Bassmaster,
    {
        register: require('good'),
        options: goodOptions
    }], (err) => {

        server.route(Routes);
        server.start(() => {

            console.log('Server running at:', server.info.uri);
        });
    });