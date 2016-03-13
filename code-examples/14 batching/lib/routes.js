'use strict';
const Joi = require('joi');
const Handlers = require('./handlers');

module.exports = [{
    method: 'GET',
    path: '/places/{id}',
    config: {
        handler: Handlers.getPlace,
        description: 'Get a place',
        tags: ['api'],
        validate: {
            params: {
                id: Joi.string()
                    .required()
                    .description('the id of a place')
            }
        }
    }
},{
    method: 'GET',
    path: '/places',
    config: {
        handler: Handlers.getPlaces,
        description: 'Get places',
        tags: ['api']
    }
},{
    method: 'GET',
    path: '/users/{id}',
    config: {
        handler: Handlers.getUser,
        description: 'Get a user',
        tags: ['api'],
        validate: {
            params: {
                id: Joi.string()
                    .required()
                    .description('the id of a place')
            }
        }
    }
},{
    method: 'GET',
    path: '/users',
    config: {
        handler: Handlers.getUsers,
        description: 'Get user',
        tags: ['api']
    }
}]


