'use strict';
/*
Demos of server.method, server.decorate and server.bind

A request to http://localhost:3000/method will return 'Sum result, 10!'
A request to http://localhost:3000/decorate will return '{ status: 'ok' }'
A request to http://localhost:3000/bind will return 'connected'
*/

const Hapi = require('hapi');
const Service  = require('./service');
const server = new Hapi.Server();


server.connection({
    host: 'localhost',
    port: 3000
});


const add = function (x, y, next) {
    next(null, x + y);
};
server.method('add', add, {});


const success = function () {
    return this.response({ status: 'ok' });
};
server.decorate('reply', 'success', success);


server.bind({
    service: new Service({
        url: 'x',
        password: 'y',
        username: 'z'
    })
});


server.route([{
    method: 'GET',
    path: '/method',
    handler: (request, reply) => {
        // you can use add anywhere in your app where you have access to the server object
        server.methods.add(5,5, (err,result) => {
            reply('Sum result, ' + result + '!');
        });
    }
},{
    method: 'GET',
    path: '/decorate',
    handler: (request, reply) => {
        // uses new 'success' method we decorated the reply object with
        reply.success();
    }
},{
    method: 'GET',
    path: '/bind',
    handler: (request, reply) => {
        // uses new 'service' object - can be used with 'this' context
        reply(server.realm.settings.bind.service.state);
    }
}]);


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

