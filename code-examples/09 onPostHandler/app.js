'use strict';
/*
Demos of the use a onPostHandler inside a plug-in to add querystring data into template data globally

A request to http://localhost:3000/article?one=1&two=2 will show a template displaying the querystring data
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
        {plugin: './plugins/user-routes.js'},
        {plugin: './plugins/append-queries'}
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