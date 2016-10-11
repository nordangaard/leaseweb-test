var path = require('path');

// a little helper for fixing paths for various environments
var fixPath = function(pathString) {
  return path.resolve(path.normalize(pathString));
};

module.exports = {
  entry: './app/main.js',
  output: {
    path: fixPath('public/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }, ]
  },
  resolve: {
    extensions: ['', '.js', '.css', '.scss'],
    modulesDirectories: ['node_modules']
  },
  watch: true
}
