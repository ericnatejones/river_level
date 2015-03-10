'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'restangular',
  'ngRoute',
  'ui.bootstrap',
  'myApp.sites',
  'myApp.site_detail',
  'myApp.version'
])

    .config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
      $routeProvider
          .otherwise({redirectTo: '/sites'});

      RestangularProvider.setBaseUrl('http://localhost:8001')
  }]);