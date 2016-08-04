const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const glob = require('globby');

const moduleDefinition = {
    loaders: [
        {test: /.haml$/, loader: "haml"},
        {test: /\.scss$/, loaders: ["style", "css", "sass"]}
    ]
};

const resolve = {
    extensions: ['', '.webpack.js', '.web.js', '.js']
};

module.exports = {
    entry: {
        app: glob.sync([
            './src/init.js',
            '!./src/main.js',
            './src/**/*.jss'
        ]).concat(['./src/main.js']),
        vendor: ['vue']
    },
    output: {
        path: "./dist",
        filename: 'bowling.js'
    },
    resolve: resolve,
    module: moduleDefinition,
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bowling.js"),
    ]
};
//
// - Implement a scoring system for a bowling game according to these rules:
//     - A game consists of 10 frames.
// - In general each frame has 2 rolls.
// - In general a player scores the number of pins knocked down.
// - If the player knocks down all 10 pins on the first roll it’s a strike.
//      The player scores 10 plus the number of pins knocked down in the next two rolls.
// - If the player knocks down all 10 pins in two rolls it’s a spare.
//      The player scores 10 plus the number of pins knocked down in the next roll.
// - A decent visualisation of the game. Be creative here :)
//
// Bonus:
//
//     - Add support for the last frame in the game:
//     - The player gets additional rolls in the last frame: one additional for a spare after the second roll or two extra rolls for a strike.
// * Create a method that randomly throws a roll (one roll is 1-10 pins knocked down), and progresses the scoring.
// * Support multiple players.
// * Or anything fun you can think of :)