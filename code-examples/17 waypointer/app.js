'use strict';
/*
Demos of hapi-swagger plug-in adding auto documenting API

A request to http://localhost:3000/documentation#/ will display documentation - note function are moched
*/

const Fs = require('fs');
const Path = require('path');
const Wreck = require('wreck');
const Blipp = require('blipp');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const HapiWaypointer = require('hapi-waypointer');

const Routes = require('./lib/routes');
const SwaggerOptions = require('./lib/swagger-options');
const WaypointerOptions = require('./lib/waypointer-options');
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
    Vision,
    Blipp,
    {
        register: require('good'),
        options: goodOptions
    },{
        register: HapiSwagger,
        options: SwaggerOptions
    },{
        register: HapiWaypointer,
        options: WaypointerOptions
    }], (err) => {

    server.route(Routes);
    server.start(() => {

        console.log('Server running at:', server.info.uri);
    });
});



server.views({
    path: 'public',
    engines: { html: require('handlebars') },
    isCached: false
});

