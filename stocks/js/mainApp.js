console.log("Loading main app");

var app = angular.module("mainApp", ["ngRoute"]);

app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "./pages/home.html"
    })
    .otherwise({
      templateUrl: "./pages/hello.html"
    });
}]);