var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');

module.exports = {
  mode: "development",
  resolve: {
    extensions: ['.js', '.jsx']
  },
    entry: [
	path.join(__dirname, '../index.js')
 	],
    output: {
        path:__dirname+ '/dist/',
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        inline: false,
        contentBase: parentDir,
    },
    module: {
	rules: [
            {
		enforce: "pre",
                test: /\.jsx?$/,
                exclude:/(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }

};
