var skysalt = angular.module('skysalt',['chart.js','ngRoute','ui.bootstrap','ngAnimate','ngResource']);

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
        console.log($scope.selectedMin);
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
            $scope.storage={};
            $scope.storage.memory   =[];
            $scope.storage.vmemory  =[];
            $scope.storage.ifOps    =[];
            $scope.storage.loadAvg  =[];
            $scope.storage.diskOps  =[];
            $scope.storage.cpu      =[];

            /*Here is functions to gettin data*/
            $scope.getMemory    = function(){

                $scope.tmp=$resource('data/minion/memory?minion='+$scope.selectedMin).query(function() {
                    $scope.storage.memory.push($scope.tmp);
                    $scope.crop($scope.storage.memory, 21)
                });

            };
            $scope.getVMemory   = function(){

                $scope.tmp=$resource('data/minion/vmemory?minion='+$scope.selectedMin).query(function(e){
                    console.log(e);
                    $scope.storage.vmemory.push($scope.tmp);
                    $scope.crop($scope.storage.vmemory,21)
                });

            };
            $scope.getIfOps     = function() {

                $scope.tmp=$resource('data/minion/ifops?minion='+vm.selectedMin).query(function(e){
                    console.log(e);
                   $scope.storage.ifOps.push($scope.tmp);
                    $scope.crop($scope.storage.ifOps,21)
                });

            };
            $scope.getLoadAvg   = function() {

                $scope.tmp=$resource('data/minion/loadav?minion='+vm.selectedMin).query(function(e){
                    console.log(e);
                    $scope.storage.loadAvg.push($scope.tmp);
                    $scope.crop($scope.storage.loadAvg,21)
                });

            };
            $scope.getDiskOps   = function() {

                $scope.tmp=$resource('data/minion/disk?minion='+vm.selectedMin).query(function(e){
                    //console.log(e);
                    $scope.storage.diskOps.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
                    $scope.storage.diskOps.options = {scales: {yAxes: [{id: 'y-axis-1',type: 'linear',display: true,position: 'left'},{id: 'y-axis-2',type: 'linear',display: true,position: 'right'}]}};
                    $scope.d = new Date();

                    $scope.storage.diskOps.legend=[];
                    $scope.storage.diskOps.States=[];
                    $scope.storage.diskOps.legend=[];
                    $scope.storage.diskOps.legend.push($scope.d.getHours()+":"+ $scope.d.getMinutes());
                    console.log($scope.tmp[0][vm.selectedMin].replace(new RegExp("sdiskio(",'g'),"[").replace(new RegExp(")",'g'),"]"));
                                        console.log(JSON.parse($scope.tmp[0][vm.selectedMin].replace(new RegExp("sdiskio(",'g'),"[").replace(new RegExp(")",'g'),"]")));
                    $scope.storage.diskOps.States=["R/W count","R/W time"];
                    $scope.storage.diskOps[0]=[];
                    $scope.storage.diskOps[0].push($scope.tmp[0][vm.selectedMin].sdiskio.read_count);
                    $scope.storage.diskOps[0].push($scope.tmp[0][vm.selectedMin].sdiskio.write_count);
                    $scope.storage.diskOps[0].push($scope.tmp[0][vm.selectedMin].sdiskio.read_time);
                    $scope.storage.diskOps[0].push(JSON.parse(e[0][vm.selectedMin]));

                    $scope.crop($scope.storage.diskOps,25)
                });

            };
            $scope.getCpu       = function() {

                $scope.tmp=$resource('data/minion/cpu?minion='+vm.selectedMin).query(function(e){
                    console.log(e);
                    $scope.storage.cpu.push($scope.tmp[0][vm.selectedMin]);
                    $scope.storage.cpu.push(100-$scope.tmp[0][vm.selectedMin]);
                    $scope.crop($scope.storage.cpu,3);
                    $scope.storage.cpuLegend=["Used","Free"]
                });




            };

            /*Crop arrays*/
            $scope.crop = function(arr, len){

                while (arr.length >= len){
                    arr.shift()
                }
            };

            /*Here is setInterval funct to periodically call new data*/
            $scope.repeater = function(name,timer){
                setInterval(name,timer)
            }


        }else{
            alert("minion not selected or invalid!")
        }
    }


});

