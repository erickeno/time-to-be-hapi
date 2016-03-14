'use strict';
/*
Demos adding the inert plugin which servers static content

A request to http://localhost:3000/ will log a 200 request in console
A request to http://localhost:3000/static/ will log a 200 request in console
*/

const Hapi = require('hapi');
const Inert = require('inert');
const Blipp = require('blipp');
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


server.register([Inert,Blipp,{
    register: require('good'),
    options: goodOptions
}], (err) => {

    server.route(Routes);
    server.start(() => {

        console.log('Server running at:', server.info.uri);
    });
});