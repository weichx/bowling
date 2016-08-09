var path = require('path');
var webpack = require('webpack');
var glob = require('globby');

module.exports = {
    //devtool: 'eval-cheap-module-source-map',
    entry: {
        app: glob.sync([
            '!./src/main.js',
            './src/**/*.js',
        ]).concat(['./src/main.js']),
        vendor: ['vue', 'cannon']
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bowling.js'
    },

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    module: {
        loaders: [
            // { test: /\.js/, loader: "babel-loader" },
            { test: /\.json/, loader: "json" },
            { test: /\.glsl/, loader: "webpack-glsl"},
            { test: /\.html/, loader: "html"},
            { test: /\.scss$/, loaders: ["style", "css", "sass"] }
        ]
    },
    htmlLoader: {
        attrs: false
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bowling.js")
    ]
};