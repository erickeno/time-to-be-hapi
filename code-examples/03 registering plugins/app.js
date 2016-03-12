'use strict';
/*
Demos adding the inert plugin which servers static content

A request to http://localhost:3000/static/ will return the content of the assets/index.html
*/

const Hapi = require('hapi');
const Inert = require('inert');
const Routes = require('./lib/routes');
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000
});


server.register([Inert], (err) => {

    server.route(Routes);
    server.start(() => {

        console.log('Server running at:', server.info.uri);
    });
});