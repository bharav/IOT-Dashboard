angular.module('mapsApp')
    .controller('TruckDetailsController', ['$scope', '$routeParams', 'TruckServices', function($scope, $routeParams, TruckServices) {
        var UpdateMarkerData = function(){
            TruckServices.gettruckDetailbyNumber($routeParams.id).then(function(data) {
                $scope.truck = data;
                $scope.truck.minPressure = 10000000;
                
                for(let i = 0; i < $scope.truck.tirepressure.length; i++){
                    if($scope.truck.minPressure > $scope.truck.tirepressure[i]){
                        $scope.truck.minPressure = $scope.truck.tirepressure[i];
                    }
                }
                
                console.log($scope.truck);
                
                if($scope.marker){
                    $scope.marker.setMap(null);
                    $scope.markers = undefined;
                }
                
                createMarker($scope.truck);
            });
        }
        
        var createMarker = function(info) {

            let marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.TruckDetail,
                icon: "Images/TMarker.png"
            });
            marker.content = '<div class="infoWindowContent"></div>';
            marker.title = info.TruckDetail;

            $scope.marker = marker;
        }
        
        UpdateMarkerData();
        setInterval(UpdateMarkerData, 5000);
        
        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(12.976410, 77.594598),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        
    }]);



/*
ContainerId
:
"Cont1"
ContainerTemp
:
-5
OutsideTemp
:
23
TruckDetail
:
"KA03AA1111"
__v
:
0
_id
:
"56f37ca227ff79ec3439bcfc"
createddate
:
"2016-03-24T05:35:30.711Z"
deviceId
:
"MyDeviceId"
drivername
:
"Mark Zukenbeirg"
end
:
"Hebbal"
fuel
:
44.9
lat
:
12.98479
lng
:
77.63415
pic
:
"http://api.randomuser.me/portraits/thumb/men/14.jpg"
speed
:
50
start
:
"Silk Board"
tirepressure
:
Array[4]
0
:
50
1
:
50
2
:
50
3
:
50*/