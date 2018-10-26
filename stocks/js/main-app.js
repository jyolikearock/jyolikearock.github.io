console.log("Loading main app");

var app = angular.module("mainApp", ["ngRoute"]);

// router
app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider
    .when("/sectors/", {
      templateUrl: "./pages/sectors.html"
    })
    .when("/sectors/:sector", {
      templateUrl: "./pages/sectors.html"
    })
    .otherwise({
      templateUrl: "./pages/home.html"
    });
}]);

// populate sectors



