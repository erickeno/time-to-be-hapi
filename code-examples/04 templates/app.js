'use strict';
/*
Demos adding the vision plugin to servers handlebars templates

A request to http://localhost:3000/article will return the content of the templates/index.html
*/

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Routes = require('./lib/routes');
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000
});


server.register([
    Inert,
    Vision], (err) => {

    server.route(Routes);
    server.start(() => {

        console.log('Server running at:', server.info.uri);
    });
});


server.views({
    relativeTo: __dirname,
    path: 'templates',
    partialsPath: 'templates/withPartials',
    helpersPath: 'templates/helpers',
    engines: { html: require('handlebars') }
});




