var app = angular.module("mainApp",
  ["ngRoute", "ngAnimate", "smart-table", "chart.js", "ui.bootstrap"]);

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
    .when("/rankings/:symbol", {
      templateUrl: "./pages/rankings.html",
      controller: "rankingsController"
    })
    .when("/last-month", {
      templateUrl: "./pages/last-month.html",
      controller: "lastMonthRankingsController"
    })
    .when("/preferences", {
      templateUrl: "./pages/preferences.html",
      controller: "preferencesController"
    })
    .otherwise({
      templateUrl: "./pages/home.html"
    });
}]);

// custom directive for persisting table view
app.directive('stPersist', function () {
  return {
    require: '^stTable',
    link: function (scope, element, attr, ctrl) {
      var nameSpace = attr.stPersist;

      //save the table state every time it changes
      scope.$watch(function () {
        return ctrl.tableState();
      }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
            localStorage.setItem(nameSpace, JSON.stringify(newValue));
        }
      }, true);

      //fetch the table state when the directive is loaded
      if (localStorage.getItem(nameSpace)) {
        var savedState = JSON.parse(localStorage.getItem(nameSpace));
        var tableState = ctrl.tableState();

        angular.extend(tableState, savedState);
        ctrl.pipe();
      }

    }
  };
});
