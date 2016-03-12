'use strict';

const after = function(server, next) {

    server.ext('onPostHandler', (request, reply) => {

        let response = request.response;
        if (response.variety === 'view') {
            if (!response.source.context) {
                response.source.context = {};
            }
            if (request.query) {
                response.source.context.query = objectToArray(request.query);
            }
        }
        return reply.continue();
    });

    next();
};


exports.register = function(server, options, next) {
    // add route plugin dependencies and name of function to call
    server.dependency(['vision'], after);
    next();
};

exports.register.attributes = {
    name: 'append-queries'
};


const objectToArray = function(obj) {
    return Object.keys(obj).map( (key) => {
        return [key, obj[key]]
    });
}
