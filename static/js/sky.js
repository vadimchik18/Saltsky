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

    $scope.loadData = function(all){
        console.log($scope.selectedMin)
        $scope.data={};

        if (all == true && $scope.selectedMin){
            $scope.data.memory=         $resource('data/minion/memory?minion='+$scope.selectedMin).query(function(e){console.log(e)});
            $scope.data.vmemory=        $resource('data/minion/vmemory?minion='+$scope.selectedMin).query(function(e){console.log(e)});
            $scope.data.diskUsage=      $resource('data/minion/usdisk?minion='+vm.selectedMin).query(function(e){console.log(e)});
            $scope.data.hwos=           $resource('data/minion/hwos?minion='+vm.selectedMin).query(function(e){console.log(e)});
            $scope.data.ifOps=          $resource('data/minion/ifops?minion='+vm.selectedMin).query(function(e){console.log(e)});
            $scope.data.loadAvg=        $resource('data/minion/loadav?minion='+vm.selectedMin).query(function(e){console.log(e)});
            $scope.data.users=          $resource('data/minion/users?minion='+vm.selectedMin).query(function(e){console.log(e)});
            $scope.data.diskOps=        $resource('data/minion/disk?minion='+vm.selectedMin).query(function(e){console.log(e)});
            $scope.data.cpu=            $resource('data/minion/cpu?minion='+vm.selectedMin).query(function(e){console.log(e)});
            console.log($scope.data);
                        $scope.data.memory=     $resource('data/minion/memory?minion='+$scope.selectedMin).query(function(e){console.log(e)});
            /*Here define containers to store dynamic data*/
            $scope.storage={}
            $scope.storage.memory   =[];
            $scope.storage.vmemory  =[];
            $scope.storage.ifOps    =[];
            $scope.storage.loadAvg  =[];
            $scope.storage.diskOps  =[];
            $scope.storage.cpu      =[];

            /*Here is functions to gettin data*/
            $scope.getMemory    = function(){

                $scope.tmp=$resource('data/minion/memory?minion='+$scope.selectedMin).query();
                $scope.storage.memory.push($scope.tmp);
                $scope.crop($scope.storage.memory)
            };
            $scope.getVMemory   = function(){

                $scope.tmp=$resource('data/minion/vmemory?minion='+$scope.selectedMin).query(function(e){console.log(e)});
                $scope.storage.vmemory.push(tmp);
                $scope.crop($scope.storage.vmemory)
            };
            $scope.getIfOps     = function() {

                $scope.tmp=$resource('data/minion/ifops?minion='+vm.selectedMin).query(function(e){console.log(e)});
                $scope.storage.ifOps.push(tmp);
                $scope.crop($scope.storage.ifOps)
            };
            $scope.getLoadAvg   = function() {

                $scope.tmp=$resource('data/minion/loadav?minion='+vm.selectedMin).query(function(e){console.log(e)});
                $scope.storage.loadAvg.push(tmp);
                $scope.crop($scope.storage.loadAvg)
            };
            $scope.getDiskOps   = function() {

                $scope.tmp=$resource('data/minion/disk?minion='+vm.selectedMin).query(function(e){console.log(e)});
                $scope.storage.diskOps.push(tmp);
                $scope.crop($scope.storage.diskOps)
            };
            $scope.getCpu       = function() {

                $scope.tmp=$resource('data/minion/cpu?minion='+vm.selectedMin).query(function(e){console.log(e)});
                $scope.storage.cpu.push(tmp);
                $scope.crop($scope.storage.cpu)
            };

            /*Crop arrays*/
            $scope.crop = function(arr){
                while (arr.length >= 21){
                    arr.shift()
                }
            };

            /*Here is setInterval funct to periodically call new data*/
            $scope.actFunc=true;
            $scope.actTimeout=true;
            setTimeout(function callData(){
                  $scope.actFunc();
                  setTimeout(callData(), $scope.actTimeout);
                }, $scope.actTimeout);

            $scope.callData=callData;
        }else{
            alert("minion not selected or invalid!")
        }
    }


});

