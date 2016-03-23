angular.module('mapsApp')
    .controller('TruckDetailsController', ['$scope','$routeParams', 'TruckServices', function($scope,$routeParams, TruckServices) {
      var Trucks;
      TruckServices.gettruckDetailbyNumber($routeParams.id).then(function(data) {
            createMarkers(data);
            var div = document.getElementById('truckID');
            var dText = data.TruckDetail;
            div.innerHTML = div.innerHTML + '#' + dText;
        
        //draw();
        setInterval(main, (1000 / 60));
        })
      
        var Position = {
            EngineTempX: 120,
            EngineTempY: 120,
            TyrePressure1X: 245,
            TyrePressure1Y: 181,
            TyrePressure2X: 509,
            TyrePressure2Y: 181
        }
        var canvas = document.getElementById('Canvas');
        var context = canvas.getContext("2d");

        // Map sprite
        var mapSprite = new Image();
        mapSprite.src = "Images/TruckNew.png";

        var Marker = function () {
            
            this.Sprite = new Image();
            this.Sprite.src = "Images/Marker1.png"
            this.Width = 12;
            this.Height = 20;
            this.XPos = 0;
            this.YPos = 0;
            this.desc = "";
        }

        var Markers = new Array();
        function getPosition(item) {
            var retdata = {};

            if (item !== null) {
                retdata.X = Position[item + "X"];
                retdata.Y = Position[item + "Y"];
            }
            return retdata;
        }
        var createMarkers = function (info) {
                  
            //Create MArkers for each property
            //Get position from position table:Currently hard coded

            //Marker for Engine Temperature
            var marker = new Marker();
            var markPos = getPosition("EngineTemp");
            marker.XPos = markPos.X;
            marker.YPos = markPos.Y;
            marker.desc = "Temperature :" +info.ContainerTemp;
            Markers.push(marker);

            //Marker for Tyre1 Pressure
            var marker = new Marker();
            var markPos = getPosition("TyrePressure1");
            marker.XPos = markPos.X;
            marker.YPos = markPos.Y;
            marker.desc = "Pressure :"+info.tirepressure[0];
            Markers.push(marker);

            //Marker for Tyre2 Pressure
            var marker = new Marker();
            var markPos = getPosition("TyrePressure2");
            marker.XPos = markPos.X;
            marker.YPos = markPos.Y;
            marker.desc = "Pressure :"+info.tirepressure[1];
            Markers.push(marker);


        }

        var firstLoad = function () {
            context.font = "15px Georgia";
            context.textAlign = "center";
            
        }

        firstLoad();

        var main = function () {
            draw();
        };

        var draw = function () {
            // Clear Canvas
            context.fillStyle = "#000";
            context.fillRect(0, 0, canvas.width, canvas.height);

           
            context.drawImage(mapSprite, 0, 0,1181, 297);

            // Draw markers
            for (var i = 0; i < Markers.length; i++) {
                var tempMarker = Markers[i];
                // Draw marker
                context.drawImage(tempMarker.Sprite, tempMarker.XPos, tempMarker.YPos, tempMarker.Width, tempMarker.Height);

                // Calculate postion text
                var markerText = tempMarker.desc;

                // Draw a simple box so you can see the position
                var textMeasurements = context.measureText(markerText);
                context.fillStyle = "#666";
                context.globalAlpha = 0.7;
                context.fillRect(tempMarker.XPos - (textMeasurements.width / 2), tempMarker.YPos - 15, textMeasurements.width, 20);
                context.globalAlpha = 1;

                // Draw position above
                context.fillStyle = "yellow";
                context.fillText(markerText, tempMarker.XPos, tempMarker.YPos);
            }
        };
        //TruckData
       
    }]);

