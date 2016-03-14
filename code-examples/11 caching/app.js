'use strict';
/*
Demos both client and server side caching

A request to http://localhost:3000/client will return response with 'cache-control' haeder
A request to http://localhost:3000/server?code=gb will return response cached server-side for 1 minute
*/

const Hapi = require('hapi');
const Joi = require('joi');
const Wreck = require('wreck');
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000
});



server.route([{
    path: '/client',
    method: 'GET',
    handler: function (request, reply) {
        reply({ 'time-to-be': 'hapi' });
    },
    config: {
        cache: {
            expiresIn: 30 * 1000,
            privacy: 'private'
        }
    }
},{
    method: 'GET',
    path: '/server',
    config: {
        handler: function(request, reply) {
            server.methods.getCountryData(request.query, function(err, result, cached, report) {
                if (err) {
                    reply(err);
                } else {
                    console.log(JSON.stringify(report))
                    const lastModified = cached ? new Date(cached.stored) : new Date();
                    reply(result).header('last-modified', lastModified.toUTCString());
                }
            });
        },
        validate: {
            query: {
                code: Joi.string()
            }
        }
    }
}]);


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});


const getCountryData = function(options, next) {
  var code = options.code || []
  var url = 'https://restcountries.eu/rest/v1/alpha?codes=' + code;
  Wreck.get(url, function (err, res, payload) {
    if (err) {
      next(err, null);
    } else {
      next(null, JSON.parse(payload));
    }
  });
};


server.method('getCountryData', getCountryData, {
  cache: {
    expiresIn: 60 * 60 * 1000,
    segment: 'countries',
    generateTimeout: 15 * 1000
  },
  generateKey: function(options) {
    return JSON.stringify(options);
  },
});
