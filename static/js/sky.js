var skysalt = angular.module('skysalt',['ngRoute','ui.bootstrap','ngAnimate','ngResource']);

skysalt.config(function($routeProvider, $httpProvider) {

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        //$modalProvider.options.animation = false;


        $httpProvider.interceptors.push(['$q', function($q) {
            return {
            request: function(config) {
            if (config.data && typeof config.data === 'object') {
                // Check https://gist.github.com/brunoscopelliti/7492579
                // for a possible way to implement the serialize function.
                               config.data = serialize(config.data);
                                       }
                               return config || $q.when(config);
                               }
                        };
                }]);
        $routeProvider

            .when('/', {
                        templateUrl : 'tpl/minions',
                        controller  : 'minionsCtrl',
                        controllerAs: 'minionsCtrl'
                    });
    });

skysalt.controller("minionsCtrl", function($scope, $resource){
    $scope.minns="ololololo";
    $resource('data/minions').query(
        function(e){
            console.log(e);
            $scope.minns=e;

        }
    );
    $scope.selectMin = function(name){
        $scope.selectedMin=name
    }

});

