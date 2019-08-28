const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const devConfig = {
    entry: {
        main: ['./index.js']
    },

    output: {
        filename: '[hash]-[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: "/",
        chunkFilename: "[name].chunk.js"
    },

    mode: 'development',

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        })
    ],

}


module.exports = devConfig;