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
},{
    method: 'GET',
    path: '/article',
    handler: (request, reply) => {
        reply.view('index.html', {'title': 'This is a template render by handlerbars.'});
    }
}]