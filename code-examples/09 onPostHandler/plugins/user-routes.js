'use strict';
const Joi = require('joi');
const UserHandlers = require('../lib/user-handlers.js');


exports.register = function(server, options, next) {

    server.route([{
        method: 'GET',
        path: '/users/{id}',
        config: {
            handler: UserHandlers.getUserById,
            validate: {
                params: {
                    id: Joi.number()
                        .min(0)
                        .required()
                        .description('the id of the user')
                },
            }
        }
    }]);

    next();
};


exports.register.attributes = {
    name: 'user-routes'
};



