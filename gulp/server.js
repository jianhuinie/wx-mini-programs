
/**
 * @file 本地server
 * @author codecooker
 */

const gulp = require('gulp');
const Hapi = require('hapi');

const mockServer = require('./mockServer');

gulp.task('server:start', function () {
    const server = new Hapi.Server();

    server.connection({
        port: 8208,
        host:'127.0.0.1'
    });

    server.start(function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Server Started at', server.info.uri);
    });

    server.route({
        method: 'POST',
        path: '/{path*}',
        handler: function (request, reply) {
            mockServer(request, reply);
        }
    });

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: function (request, reply) {
            mockServer(request, reply);
        }
    });
});