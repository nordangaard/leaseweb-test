require('./styles/main');
var servers = require('./servers');
var cars = require('./cars');


// Basic "routing", check if container exists on current page
if ( servers.load() ) {
  servers.init();
}

if ( cars.load() ) {
  cars.init();
}

/*

  Things that are done:
  - Cars.js / cars.html meet criteria of tast 1
  - Servers.js / servers.html meet criteria of task 2
  - SCSS-files variablized and split
  - Mock .json data created
  - Filter-controller that is shared between both tasks for code-reuse

  Things that could be done:
  - See servers.js
  - See cars.js
  - Add Karma-mocha test-cases in test folder
  - Add real routing to make a SPA
  - Implement REST-backen or JSON-server instead of static JSON

*/
