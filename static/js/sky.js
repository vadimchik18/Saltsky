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
    vm = this;
    $scope.minns=[{"Loading data":false}];


    $resource('data/minions').query(
        function(e){
            console.log(e);
            $scope.minns=e;

        }
    );
    $scope.selectMin = function(name){
        $scope.selectedMin=name;
        vm.selectedMin=name;
    };

    $scope.loadMem=function(){$resource('data/minion/memory?minion='+$scope.selectedMin).query(
        function(e){
            console.log(e);
            $scope.memUsage=e
        }
    )};
    $scope.memory=      $resource('data/minion/memory?minion='+$scope.selectedMin);
    $scope.vMemory=     $resource('data/minion/vmemory?minion='+$scope.selectedMin);
    $scope.diskOps=     $resource('data/minion/disk?minion='+vm.selectedMin);
    $scope.diskUsg=   $resource('data/minion/diskus?minion='+vm.selectedMin);
    $scope.hwos=        $resource('data/minion/hwos?minion='+vm.selectedMin);
    $scope.ifOps=       $resource('data/minion/ifops?minion='+vm.selectedMin);
    $scope.loadAvg= $resource('data/minion/loadav?minion='+vm.selectedMin);
    $scope.users=       $resource('data/minion/users?minion='+vm.selectedMin);
    $scope.loadData = function(all){
        console.log($scope.selectedMin)
        $scope.data={};

        if (all == true && $scope.selectedMin){
            $scope.data.memory=     $resource('data/minion/memory?minion='+$scope.selectedMin).query(function(e){console.log(e)});
            $scope.data.vmemory=    $resource('data/minion/vmemory?minion='+$scope.selectedMin).query(function(e){console.log(e)});
            $scope.data.diskOps=    $resource('data/minion/disk?minion='+vm.selectedMin).query(function(e){console.log(e)});
            $scope.data.diskUsage=  $resource('data/minion/diskus?minion='+vm.selectedMin).query(function(e){console.log(e)});
            $scope.data.hwos=       $resource('data/minion/hwos?minion='+vm.selectedMin).query(function(e){console.log(e)});
            $scope.data.ifOps=      $resource('data/minion/ifops?minion='+vm.selectedMin).query(function(e){console.log(e)});
            $scope.data.loadAvg=    $resource('data/minion/loadav?minion='+vm.selectedMin).query(function(e){console.log(e)});
            $scope.data.users=      $resource('data/minion/users?minion='+vm.selectedMin).query(function(e){console.log(e)});
            console.log($scope.data)
        }else{
            alert("minion not selected or invalid!")
        }
    }


});

