'use strict';

angular.module('myApp.sites', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sites', {
    templateUrl: 'sites/sites.html',
    controller: 'SitesCtrl'
  });
}])

.controller('SitesCtrl', ['$scope', '$http', 'Restangular', '$modal', function($scope, $http, Restangular, $modal) {
    $scope.openModal = function () {

        var modalInstance = $modal.open({
            templateUrl: 'sites/add_site_modal.html',
            controller: 'OpenModalCtrl'
            //size: size,

        })
    };
    $scope.loginModal = function () {

        var modalInstance = $modal.open({
            templateUrl: 'sites/login_modal.html',
            controller: 'LoginModalCtrl'
            //size: size,

        })
    };


    var flow;
    var description;

    //whereFrom is an variable asking what button did the user click to retrieve the data?
    var whereFrom = 'manual';
    var Site = {};
    $scope.getFlows = function(whereFrom) {

        if ($scope.site == null) {
            console.log("There needs to be a number in that box");
            $scope.site = "not site #";
            //got to make that whatever number they clicked on instead of 1
        }

        if ($scope.site.length == 8) {
            //JQUERY SCHTUFF

            apiCall(whereFrom);
        } else {
           $scope.site = "not site #";
        }
    };
    var apiCall = function(whereFrom) {
    var addSite = function() {
        Restangular.all('add-site/').customPOST(Site).then(function () {

        },
        function () {
        console.log(Site.description);
        console.log(Site.site)
        });

    };
        $.ajax({
            url: "http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + $scope.site + "&variable=00060,00065",
            dataType: 'json',
            data: '',

            success: function (json) {
                $('#sitedesc').text(json.value.timeSeries[0].sourceInfo.siteName);
                $('#discharge').val(json.value.timeSeries[0].values[0].value[0].value);

                //  save the Site number and site description to the data base here.
                $scope.description = json.value.timeSeries[0].sourceInfo.siteName;

                Site = {
                    description: $scope.description,
                    site: $scope.site
                };


                //if the user clicks a button associated with a site, dont run this restanglur call
                if (whereFrom == "manual") {
                    addSite();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#sitedesc').text('Not a real site');
                $('#discharge').val('');
                $scope.site = "not site #";
            }
        })
    };



    $scope.fillInputBoxAndGetFlows = function(numberToFill) {
        $scope.site = numberToFill;
        $scope.getFlows('from database');
    };

    Restangular.all('sites/').getList().then(function (data) {
        $scope.sites = data;
    });

        //var data = {};
    $scope.Site = [];



}])


.controller('OpenModalCtrl', function (Restangular, $scope, $modalInstance) {
    var Site = {};
    var apiCall = function(whereFrom) {
    var addSite = function() {
        Restangular.all('add-site/').customPOST(Site).then(function () {

        },
        function () {
        console.log(Site.description);
        console.log(Site.site)
        });

    };
        $.ajax({
            url: "http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + $scope.site + "&variable=00060,00065",
            dataType: 'json',
            data: '',

            success: function (json) {
                $('#sitedesc').text(json.value.timeSeries[0].sourceInfo.siteName);
                $('#discharge').val(json.value.timeSeries[0].values[0].value[0].value);

                //  save the Site number and site description to the data base here.
                $scope.description = json.value.timeSeries[0].sourceInfo.siteName;

                Site = {
                    description: $scope.description,
                    site: $scope.site
                };


                //if the user clicks a button associated with a site, dont run this restanglur call
                if (whereFrom == "manual") {
                    addSite();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#sitedesc').text('Not a real site');
                $('#discharge').val('');
                $scope.site = "not site #";
            }
        })
    };

    $scope.getFlows = function(whereFrom) {

        if ($scope.site == null) {
            console.log("There needs to be a number in that box");
            $scope.site = "not site #";
            //got to make that whatever number they clicked on instead of 1
        }

        if ($scope.site.length == 8) {
            //JQUERY SCHTUFF

            apiCall(whereFrom);
        } else {
           $scope.site = "not site #";
        }
        $scope.closeModal()
    };


    $scope.closeModal = function () {
        $modalInstance.close(false);
    };
})

.controller('LoginModalCtrl', function (Restangular, $scope, $modalInstance) {
    $scope.addUser = function() {


        //console.log(User.user_permissions)


        var User = {
            username: $scope.username,
            password: $scope.password,
            groups: {group: "default"}
        };

        Restangular.all('add-user/').customPOST(User).then(function () {

        },
        function () {
            console.log(User.username);
            console.log(User.password);

            console.log("fail?")
        });

    };
    $scope.closeModal = function () {
        $modalInstance.close(false);
    };
});