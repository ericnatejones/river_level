'use strict';

angular.module('myApp.user', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/user', {
    templateUrl: 'user/user.html',
    controller: 'UserCtrl'
  });
}])

.controller('UserCtrl', ['$scope', '$http', 'Restangular', '$routeParams', function($scope, $http, Restangular, $routeParams) {



    $scope.addUser = function() {
        var User = {
            username: $scope.username,
            password: $scope.password
        };

        Restangular.all('add-user/').customPOST(User).then(function () {

        },
        function () {
            console.log(User.username);
            console.log(User.password)
        });
        $scope.loginUser();
    };
    $scope.loginUser = function() {
        Restangular.all('users').getList().then(function (user) {
            $scope.users = user;
        });
        var User = {
            username: $scope.username,
            password: $scope.password,
            id: user._id
        };

        console.log(User.username);
        console.log(User.password)
    };


    $scope.addRiverToUser = function(siteId) {
        var userCopy = {
            username: $scope.username,
            password: $scope.password,
            id: User.id,
            sites: siteId
        };


        Restangular.all('user_detail/' + user.id).customPUT(userCopy).then(function () {

        },
        function () {
            //console.log($scope.siteId);

        });
    }


}]);