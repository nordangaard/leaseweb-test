# leaseweb-test

Built with jQuery since that is what is used in the team. Also: ES6, Webpack, Karma (Mocha, Chai) and a slider-plugin.

Instructions (for reviewing):
* Clone repository
* Open public/servers.html for task 1, open public/cars.html for task 2

Instructions (for making code-changes):
* Run 'npm install' in root of folder
* Run 'webpack' in root of folder ('npm install -G webpack', if not installed globally already)
* Make code-changes and see results

## Done
* Cars.js / cars.html meet criteria of task 1
* Servers.js / servers.html meet criteria of task 2
* SCSS-files variablized and split
* Mock *.json-data created
* Filter-controller that is shared between both tasks for code-reuse

## Improvements that could be made
* Add Karma-mocha test-cases in test folder
* Add real routing to make a SPA
* Implement REST-backend or JSON-server instead of static JSON
* For handling many elements:
..* Cache elements instead of recreating the list when rendering
..* Cache filter-results

### Task 1 (Servers)
* Make a combinator function that binds the click event directly to a filter using a jQuery hook, to do something like this: elem.filter(FilterFunction)
* Create labels automatically from slider-configuration input

### Task 2 (Cars)
* Manipulate array ONCE to partition it after brand, then calculate number of each type of car / year for helpful badges in the filter
* Clean up redundant code
* Not lock down functionality to meet criteria of assignment
* Ability to filter on price (*)
