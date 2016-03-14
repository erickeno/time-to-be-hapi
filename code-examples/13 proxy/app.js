'use strict';
/*
Demos of proxying other APIs endpoints into HAPI

http://localhost:3000/rest/v1/alpha/gb
http://localhost:3000/rest/v1/alpha/us
http://localhost:3000/country/gb
http://localhost:3000/country/2/gb
http://localhost:3000/country/3/gb
http://localhost:3000/country/4?code=gb
*/

const Hapi = require('hapi');
const Joi = require('joi');
const H2o2 = require('h2o2');
const Wreck = require('wreck');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});


server.register([H2o2], function (err) {
        server.start(function(){
            console.log('Server running at:', server.info.uri);
        });
    });


const replyWithJSON = function( err, res, request, reply, settings, ttl ){
    Wreck.read(res, { json: true }, function (err, payload) {
        reply(payload);
    });
}


server.route([{
    method: 'GET',
    path: '/rest/v1/alpha/gb',
    config: {
        description:'country GB info - with passthrough',
        tags: ['api'],
        handler: {
            proxy: {
                host: 'restcountries.eu',
                protocol: 'https',
                passThrough: true,
                xforward: true,
                onResponse: replyWithJSON
            }
        }
    }
  },{
    method: 'GET',
    path: '/rest/v1/alpha/{code}',
    config: {
        description:'country GB info - with passthrough while validating param',
        tags: ['api'],
        validate: {
            params: {
                code: Joi.string().length(2).lowercase().required()
            }
        },
        handler: {
            proxy: {
                host: 'restcountries.eu',
                protocol: 'https',
                passThrough: true,
                xforward: true,
                onResponse: replyWithJSON
            }
        }
    }
  },{
    method: 'GET',
    path: '/country/gb',
    config: {
        description:'country GB info - with uri ',
        tags: ['api'],
        handler: {
            proxy: {
                uri: 'https://restcountries.eu/rest/v1/alpha/gb',
                onResponse: replyWithJSON
            }
        }
    }
  },{
    method: 'GET',
    path: '/country/2/{code}',
     config: {
        description:'country info by code',
        tags: ['api'],
        handler: {
            proxy: {
                mapUri: function (request, callback) {
                    var code = request.params.code;
                    callback(null, 'http://restcountries.eu/rest/v1/alpha/' + code);
                },
                onResponse: replyWithJSON
            }
        }
    }
},{
    method: 'GET',
    path: '/country/3/{code}',
     config: {
        description:'country info by code',
        tags: ['api'],
        validate: {
            params: {
                code: Joi.string().length(2).lowercase().required()
            }
        },
        handler: {
            proxy: {
                mapUri: function (request, callback) {
                    var code = request.params.code;
                    callback(null, 'http://restcountries.eu/rest/v1/alpha/' + code);
                },
                onResponse: replyWithJSON
            }
        }
    }
},{
    method: 'GET',
    path: '/country/4',
     config: {
        description:'country info by code  - manual passing a swapped query to param',
        tags: ['api'],
        validate: {
            query: {
                code: Joi.string().length(2).lowercase().required()
            }
        },
        handler: {
            proxy: {
                mapUri: function (request, callback) {
                    var code = request.query.code;
                    callback(null, 'http://restcountries.eu/rest/v1/alpha/' + code);
                },
                onResponse: replyWithJSON
            }
        }
    }
}]);


