'use strict';
/*
Demos of the use a glue plugin to provide configuration based composition of hapi's server object.
This is useful when the manifest is changed between development and product environment

A request to http://localhost:3000/article will return the content of the templates/index.html
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
        {plugin: './plugins/routes.js'}
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