var app = angular.module("mainApp", ["ngRoute"]);

app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "./views/home.html"
    })
    .otherwise({ redirectTo: "/" });
}]);