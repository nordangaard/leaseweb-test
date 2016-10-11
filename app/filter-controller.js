var _ = require('underscore');

var filterData;
var filters = [];

function init(data) {
  filterData = data;
  // Do some initialization
  trigger('initialized', filterData);
}

function getFilter(id) {
  var filter = _.findWhere(filters, {id});

  if ( !filter ) {
    filter = {id};
    filters.push(filter);
  }

  return filter;
}

function filter(id, fn) {
  var filter = getFilter(id);
  filter.fn = fn;

  runFilters();
}

function remove(id) {
  filters = _.reject(filters, (filter)=> { return filter.id === id; });
  runFilters();
}

function reset() {
  filters.length = [];
  runFilters();
}

function runFilters() {
  console.log("Filters", filters)
  var returnData = _.filter(filterData, (obj) => {
    return _.every(filters, (filter) => { return filter.fn.call(obj, obj); });
  });

  trigger('data:filtered', returnData, filters);
}


// Publish/Subscribe to handle events when recalc filters
var registeredCallbacks = [];

function on(id, callback) {
  registeredCallbacks.push({id, callback});
}

function trigger(id, ...args) {
  var callbacks = _.filter(registeredCallbacks, (cb) => {  return cb.id === id; } );
  _.each(callbacks, (cb) => { cb.callback.apply(this, args); });
}

module.exports = {
  init: init,
  on: on,
  filter: filter,
  remove: remove,
  reset: reset
}
