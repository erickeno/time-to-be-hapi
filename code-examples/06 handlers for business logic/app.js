'use strict';
/*
Demos of the use of handlers as an interface between http server and business logic

A request to http://localhost:3000/users/1 will a js object {name: 'Glenn Jones'}
A request to http://localhost:3000/users/2 will a 404 not found
A request to http://localhost:3000/users/x will a 400 bad request with details of issue
*/


const Glue = require('glue');


let manifest = {
    server: {},
    connections: [
        {
            host: 'localhost',
            port: 3000,
            labels: ['web']
        }
    ],
    registrations: [
        {plugin: 'inert'},
        {plugin: 'vision'},
        {plugin: {
                register: 'visionary',
                options: {
                    'engines': { 'html': 'handlebars' },
                    'path': 'templates',
                    'partialsPath': './templates/withPartials',
                    'helpersPath': './templates/helpers',
                    'isCached': false
                }
            }
        },
        {plugin: './plugins/static-routes.js'},
        {plugin: './plugins/user-routes.js'}
    ]
};


let options = {
    relativeTo: __dirname
};


Glue.compose(manifest, options, function(err, server) {

    if (err) {
        throw err;
    }

    server.start(function() {

        console.log('Server running at:', server.info.uri);
    });
});