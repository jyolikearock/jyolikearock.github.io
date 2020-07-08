'use strict';

var pageSize = 13;

// enables tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// Declare app level module which depends on views, and core components
var app = angular.module('app', [
  'ngRoute',
  'smart-table',
  'app.pokemons',
  'app.fastMoves',
  'app.chargeMoves'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/pokemon'});
}]);

app.run(function($rootScope) {
    $rootScope.getIconPath = function(type) {
        return "./icons/" + type.toLowerCase() + ".svg";
    }
});

// custom smart-table directive for persisting table view
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