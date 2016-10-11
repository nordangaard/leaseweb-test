const $ = require('jquery');
const _ = require('underscore');
const slider = require('nouislider');
const data = require('./json/server-data.json');

/* ######################## CONTROLLER ########################  */

const filterController = require('./filter-controller');

/* ######################## VIEW ########################  */

// Setting up the JQuery namespace to use
const namespace = $('.servers-app');
const bind = (selector) => { return namespace.find(selector); };

// Initialize filters with initial data

function init () {

  // Bindings to the UI

  const uiBindings = {
    'filters': bind('.filters'),
    'memorySlider': bind('#memory-slider'),
    'spaceSlider': bind('#space-slider'),
    'typeDropdown': bind('#disk-type'),
    'list': bind('.server-list')
  };

  // Methods for rendering data / the server list

  function renderList(newList) {
    uiBindings.list.empty();
    uiBindings.list.append(newList);
  }

  function $server(server) {
    return $('<li>', {class: 'server'})
      .append(
        $('<h3>', {text: server.name}),
        $('<div>', {text: server.CPU}),
        $('<div>', {text: server.memory}),
        $('<div>', {text: server.disk}),
        $('<div>', {text: '$' + server.price, class: 'price'}),
      );
  }

  /* ########## Setting up filter events #########  */
  filterController.on('initialized', (data) => {
    const nodes = _.map(data, (obj)=> { return $server(obj); });
    renderList(nodes);
  });

  filterController.on('data:filtered', (data, filters) => {
    const nodes = _.map(data, (obj)=> { return $server(obj); });
    renderList(nodes);
  });



  /* ######################## FILTERS ########################  */

  /* ########## Setting up the memory-slider #########  */
  let memorySlider = uiBindings.memorySlider[0];

  slider.create( memorySlider, {
    start: [ 0, 96 ],
    snap: true,
    connect: true,
    range: {
      'min': 0,
      '10%': 2,
      '20%': 4,
      '30%': 8,
      '40%': 12,
      '50%': 16,
      '60%': 24,
      '70%': 32,
      '80%': 48,
      '90%': 64,
      'max': 96
    }
  });

  memorySlider.noUiSlider.on('change', function(values) {
    values = _.map(values, (val) => { return parseInt(val); });

    filterController.filter('memory', (obj) => {
      return _.some(obj.avaliableMemory,( m ) => {
                return (m >= values[0]) && (m <= values[1])
              });
    });
  });

  /* ########## Setting up the space-slider #########  */
  let spaceSlider = uiBindings.spaceSlider[0];

  slider.create( spaceSlider, {
    start: [ 0.25, 72 ],
    snap: true,
    connect: true,
    range: {
      'min': 0.25,
      '10%': 0.5,
      '20%': 1,
      '30%': 2,
      '40%': 3,
      '50%': 4,
      '60%': 8,
      '70%': 12,
      '80%': 24,
      '90%': 48,
      'max': 72
    }
  });

  spaceSlider.noUiSlider.on('change', function(values) {
    values = _.map(values, (val) => { return Number(val); });

    filterController.filter('disk', (obj) => {
      return _.some(obj.avaliableDisk,( m ) => {
                m = Number(m/1000);
                return (m >= values[0]) && (m <= values[1])
            });
    });
  });

  /* ########## Setting up the disk-type dropdown #########  */
  uiBindings.typeDropdown.on('change', function() {
    const value = $(this).val();

    filterController.filter('disktype', (obj) => {
      return !value || _.contains(obj.diskType, value);
    });
  });

  filterController.init(data);
}

function load() {
  return namespace.length;
}


module.exports = {
  init,
  load
};


/*
  Improvements that could be made:
  - Make a combinator function that binds the click event directly to a filter
    using a jQuery hook, to do something like this: elem.filter(FilterFunction)
  - Create labels automatically from slider-configuration input
  - FOR MANY ELEMENTS:
    - Cache elements instead of recreating the list when rendering
    - Cache filter-results

*/
