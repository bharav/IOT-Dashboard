angular.module('mapsApp.services', [])
    .factory('TruckServices', function ($http, $q) {
        // Might use a resource here that returns a JSON array
        // Some fake testing data
        var currentTruckDetail;
   
        function getTrucks(){
             var deferred = $q.defer();
            $http.get("/api/trucks")
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    console.log("Error in http call.");
                    deferred.reject();
                });
            return deferred.promise;
        }
        //Get truck details from server "Parameter" truckdetail
        function gettruckDetailbyNumber(truckdetail) {
            var deferred = $q.defer();
            $http.get("/api/trucks/" + truckdetail)
                .success(function (data, status) {
                    console.log("Received order from HTTP", data, status);
                    deferred.resolve(data);
                })
                .error(function () {
                    console.log("Error in http call.");
                    deferred.reject();
                });
            return deferred.promise;
        }
     
        return {
            getTrucks: getTrucks,
            gettruckDetailbyNumber: gettruckDetailbyNumber
        }

    })
   