require('es6-promise').polyfill();

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    client: path.join(__dirname, 'client'),
    build: path.join(__dirname, 'build'),
    common: path.join(__dirname, 'common')
}

process.env.BABEL_ENV = TARGET;

const common = {
    env: {
        PATHS: PATHS,
        TARGET: process.env.npm_lifecycle_event
    },
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(PATHS.client, 'index.jsx')
    ],
    module: {
        loaders:[{
            test: /\.jsx$/,
            loaders: ['react-hot', 'babel'],
            include: PATHS.client
        }, {
            test: /\.js$/,
            loaders: ['babel'],
            include: [ PATHS.client, PATHS.common ]
        }, {
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: PATHS.client
        },
        {
            test: /\.less$/,
            loaders: ['style', 'css', 'less'],
            include: PATHS.client
        }, {
            test: /\.scss/,
            loaders: ['style', 'css', 'sass'],
            include: PATHS.client
        }, {
            test: /\.(otf|eot|svg|ttf|woff)/,
            loader: 'url-loader?limit=8192'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ["node_modules", "third_party"],
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
    ]
}

if (TARGET === 'server' || !TARGET) {
    module.exports = merge(common, {
        devTool: 'eval-source-map',
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST || '0.0.0.0',
            port: process.env.PORT || 8001
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new NpmInstallPlugin({
                save: true
            }),
            new webpack.NoErrorsPlugin()
        ]
    });
}

if (TARGET === 'build') {
     module.exports = merge(common, {});
}
