module.exports = [{
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply('Hello, world!');
    }
},{
    method: 'GET',
    path: '/{name}',
    handler: (request, reply) => {
        reply('Hello, ' + request.params.name + '!');
    }
},{
    method: 'GET',
    path: '/static/{path*}',
    handler: {
        directory: {
            path: './static'
        }
    }
}]