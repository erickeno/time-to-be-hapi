'use strict';
// a simple handler which interact between http server and business logic
const Boom = require('boom');
const Users = require('../lib/users');


const getUserById = function(request, reply) {

    Users.getById(request.params.id, (err, json) => {

        if (err !== null) {
            reply(Boom.notFound('invalid request: ' + err));
        } else {
            reply(json).type('application/json').code(200)
        }
    });
}


exports.getUserById = getUserById;