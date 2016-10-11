module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-webpack',
    ],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'tests/**/*.js',
    ],
    preprocessors: {
      'tests/**/*.js': ['webpack']
    },
    browsers: ['PhantomJS'],
    reporters: ['mocha'],
    singleRun: true
  })
}
