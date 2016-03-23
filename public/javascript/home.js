
var selectedItem;
//Angular App Module and Controller
function openPopup(truck) {
                        $location.path('/' + data._id + "/read");
}


angular.module('mapsApp')
    .controller('MapCtrl', ['$scope', 'TruckServices', function($scope, TruckServices) {
        var UpdateMarkerData = function(){
            TruckServices.getTrucks().then(function(data) {
                trucks = data;
                $scope.trucks=data;
                console.log(trucks);
                
                for (var i = 0; i < $scope.markers.length; i++ ) {
                    $scope.markers[i].setMap(null);
                }
                
                $scope.markers = [];
                for (i = 0; i < trucks.length; i++) {
                    createMarker(trucks[i]);
                }
            });
        } 
        
        UpdateMarkerData();
        setInterval(UpdateMarkerData, 5000);
        
        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(12.976410, 77.594598),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];

        var infoWindow = new google.maps.InfoWindow();



        var createMarker = function(info) {

            let marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.TruckDetail,
                icon: "Images/TMarker.png"
            });
            marker.content = '<div class="infoWindowContent"></div>';
            marker.title = info.TruckDetail;
            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent(marker.title + marker.content + '<a href="#/truck/' + marker.title + '">View</a>');
                selectedItem = marker.title
                infoWindow.open($scope.map, marker);
            });

            $scope.markers.push(marker);

        }

        $scope.openInfoWindow = function(e, selectedMarker) {
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }

    }]);