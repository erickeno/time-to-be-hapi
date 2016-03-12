'use strict';

const after = function (server, next) {

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
        path: '/static/{path*}',
        handler: {
            directory: {
                path: './static'
            }
        }
    },{
        method: 'GET',
        path: '/article',
        handler: (request, reply) => {
            reply.view('index.html', {'title': 'This is a template render by handlerbars.'});
        }
    }]);

    return next();
};


exports.register = function (server, options, next) {
    // add route plugin dependencies and name of function to call
    server.dependency(['inert','vision'], after);
    next();
};


exports.register.attributes = {
    name: 'routes',
    multiple: true
};



