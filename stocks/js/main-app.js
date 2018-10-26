console.log("Loading main app");

var app = angular.module("mainApp", ["ngRoute", "smart-table"]);

// router
app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider
    .when("/sectors/", {
      templateUrl: "./pages/sectors.html",
      controller: "sectorsController"
    })
    .when("/sectors/:sector", {
      templateUrl: "./pages/sectors.html",
      controller: "sectorsController"
    })
    .when("/symbols", {
      templateUrl: "./pages/symbols.html"
    })
    .when("/symbols/:symbol", {
      templateUrl: "./pages/symbols.html"
    })
    .otherwise({
      templateUrl: "./pages/home.html"
    });
}]);

// populate sectors



