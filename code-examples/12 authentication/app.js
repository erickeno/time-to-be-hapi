'use strict';
/*
Demos of basic auth

A request to http://localhost:3000/ will ask you to logon and then return page with name
*/


const Hapi = require('hapi');
const Bcrypt = require('bcrypt-nodejs');
const AuthBasic = require('hapi-auth-basic')


// Create a in memory collections of users
const users = {
    jane: {
        username: 'jane',
        password: '$2a$10$XPk.7lupEzBSHxUg/IavSuIKmwmpBbW0NfCL8q0ZfHXUPXTtbhmNK',   // 'password'
        name: 'Jane Doe',
        id: '2133d32a'
    }
};


// Create hash for string 'password'
/*Bcrypt.hash('password', null, null, function (err, hash) {
  console.log(err, hash);
});*/


// Create a validation function for strategy
const validate = function (request, username, password, callback) {
    let user = users[username];
    if (!user) {
        callback(null, false);
    }
    Bcrypt.compare(password, user.password, function (err, isValid) {
        callback(err, isValid, { id: user.id, name: user.name });
    });
};


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});


// Add a simple route
const routes = {
    method: 'GET',
    path: '/',
    config: { auth: 'simple' },
    handler: function (request, reply) {
        var name = request.auth.credentials.name
        reply('hello ' + name);
    }
};


// Add the basic-auth plug-in
server.register([AuthBasic], function (err) {

    if (err) {
        throw err;
    }

    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    server.route(routes)

    server.start(() => {

        console.log('Server running at:', server.info.uri);
    });
});
