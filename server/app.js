import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackMiddleware from 'webpack-dev-middleware';
import config from '../webpack.config.js';

export default function createApp(io, port) {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: config.env.PATHS.client,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    const app = express();

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.use(express.static(config.env.PATHS.build));
    app.get('*', function(req, resp) {
        resp.sendFile(path.join(config.env.PATHS.build, 'index.html'))
    });

    const http = app.listen(port, '0.0.0.0', function onStart(err){
        if (err) {
            console.log(util.inspect(err));
        }
        console.info('==>  Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
    })
    io.attach(http);
    return app;

}
