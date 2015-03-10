'use strict';

angular.module('myApp.site_detail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/site_detail/:siteId', {
    templateUrl: 'site_detail/site_detail.html',
    controller: 'SiteDetailCtrl'
  });
}])

.controller('SiteDetailCtrl', ['$scope', 'Restangular', '$routeParams', '$location', function($scope, Restangular, $routeParams, $location) {
    $scope.siteId = $routeParams.siteId;
    Restangular.one('site_detail', $scope.siteId).customGET().then(function (site) {
        $scope.site = site;
    });



}]);