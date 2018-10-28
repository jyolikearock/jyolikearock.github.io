var app = angular.module("mainApp",
  ["ngRoute", "smart-table", "chart.js", "ui.bootstrap"]);

// router
app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider
    .when("/symbols", {
      templateUrl: "./pages/symbols.html",
      controller: "symbolsController"
    })
    .when("/symbols/:symbol", {
      templateUrl: "./pages/symbols.html",
      controller: "symbolsController"
    })
    .when("/rankings", {
      templateUrl: "./pages/rankings.html",
      controller: "rankingsController"
    })
    .when("/sectors/", {
      templateUrl: "./pages/sectors.html",
      controller: "sectorsController"
    })
    .when("/sectors/:sector", {
      templateUrl: "./pages/sectors.html",
      controller: "sectorsController"
    })
    .otherwise({
      templateUrl: "./pages/home.html"
    });
}]);
