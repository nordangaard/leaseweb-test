const $ = require('jquery');
const _ = require('underscore');
const data = require('./json/cars-data.json');

/* ######################## CONTROLLER ########################  */

const filterController = require('./filter-controller');

/* ######################## VIEW ########################  */

// Setting up the JQuery namespace to use
const namespace = $('.cars-app');
const bind = (selector) => { return namespace.find(selector); };


function init() {

  // Bindings to the UI
  const uiBindings = {
    'filters': bind('.filters'),
    'list': bind('.car-list'),
    'brands': {
      'filter': bind('#brand-list'),
      'list': bind('#brand-list .select-list')
    },
    'years': {
      'filter': bind('#year-list'),
      'list': bind('#year-list .select-list'),
    },
    'models': {
      'filter': bind('#model-list'),
      'list': bind('#model-list .select-list'),
    }
  };

  // UI element creation functions

  function $filterListItems( arr ){
    return _.map( arr, (val) => {
      return $('<li>', { class: 'select-item', text: val })
        .data('id', val);
    });
  }

  function $car( obj ) {
    return $('<div>', {class: 'car'}).append(
            $('<h3>', {  text: obj.name }),
            $('<div>', { text: obj.brand }),
            $('<div>', { text: obj.model }),
            $('<div>', { text: obj.year }),
            $('<div>', { class: 'price', text: '$' + obj.price }),
          )
  }

  // UI helper functions

  function hideFilter( ...filters ) {
    _.each(filters, (filter) => {
      uiBindings[filter].list.empty();
      uiBindings[filter].filter.hide();
    });
  }

  function showFilter( filter, items ) {
    uiBindings[filter].list.append( items );
    uiBindings[filter].filter.show();
  }

  function renderList(newList) {
    uiBindings.list.empty();
    uiBindings.list.append(newList);
  }

  // Data helper-functions

  function getUniqueSortedItems(haystack, needle) {
    return _.sortBy( _.uniq( _.pluck(haystack, needle) ), (v) => { return v; });
  }

  // Setting up filters and managing data

  filterController.on('initialized', (data) => {
    const brands = getUniqueSortedItems(data, "brand");

    hideFilter('brands', 'years', 'models');
    showFilter('brands', $filterListItems( brands ) );
  });


  filterController.on('data:filtered', (data, activeFilters) => {
    // Get unique values to display the filter lists
    const brands = getUniqueSortedItems(data, "brand");
    const years = getUniqueSortedItems(data, "year");
    const models = getUniqueSortedItems(data, "model");

    hideFilter('brands', 'years', 'models');

    showFilter( 'brands', $filterListItems( brands ) );

    // Render list of years and models only if a brand is selected, criteria 1-2
    if ( _.findWhere( activeFilters, {id: 'brand'} ) ) {
      showFilter('years', $filterListItems( years ) );
      showFilter('models', $filterListItems( models ) );
    }


    // Render list only if brand + year or model are selected, critera 3
    if ( _.difference ( ['brand', 'year', 'model'], _.pluck(activeFilters, 'id') ).length < 2 ) {
      renderList( _.map(data, $car) );
    } else {
      renderList( [] );
    }

  });

  // Setting up click-handlers

  uiBindings.filters.on('click', '.select-item', function(e) {
    const id = $(this).data('id');
    const select = $(this).parents('.select');
    const type = select.addClass('selected').data('type');

    if(type === 'brand')
      filterController.reset();

    filterController.filter(type, (obj) => {
      let search = {}; search[type] = id;
      return _.isMatch(obj, search);
    });

  });

  uiBindings.filters.on('click', '.remove', function(e) {
    const type = $(this).parents('.select').removeClass('selected').data('type');

    if(type === 'brand'){
      uiBindings.filters.find('.selected').removeClass('selected');
      filterController.reset();
    } else {
      filterController.remove(type);
    }
  });


  filterController.init(data);
}

function load() {
  return namespace.length;
}


module.exports = {
  init,
  load
}


/*
  Improvements that could be made:
  - Manipulate array ONCE to partition it after brand, then calculate number of each type of
    car / year for helpful badges in the filter
  - Clean up redundant code
  - Not lock down functionality to meet criteria of assignment
  - Ability to filter on price (*)
  - FOR MANY ELEMENTS:
    - Cache elements instead of recreating the list when rendering
    - Cache filter-results

*/
