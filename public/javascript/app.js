angular.module('mapsApp', ['ngRoute',"mapsApp.services"])
.config(function($routeProvider) {
   $routeProvider
		//the timeline display
		.when('/truck', {
			templateUrl: './templates/home.html',
			controller: 'MapCtrl'
		})
        .when('/truck/:id', {
			templateUrl: './templates/truckdetails.html',
			controller: 'TruckDetailsController'
		})
         .otherwise({
        redirectTo: '/truck'
      });
  })
  .run(function(){
      
  });