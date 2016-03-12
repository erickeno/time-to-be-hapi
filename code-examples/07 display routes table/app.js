'use strict';
/*
Demos of the use of blipp just fire up app and the routes table will be shown in the cmd window

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
        {plugin: 'blipp'},
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