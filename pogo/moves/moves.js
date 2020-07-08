'use strict';

var currentTab = "pvpFast";

angular.module('app.moves', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/moves', {
    templateUrl: 'moves/moves.html',
    controller: 'movesController'
  });
}])

.controller('movesController', ['$scope', function($scope) {

    $scope.pageSize = pageSize;
    $scope.currentTab = currentTab;

    $scope.fastMoves = fastMoves;
    $scope.chargeMoves = chargeMoves;

    $scope.showTab = function(tab) {
        currentTab = tab;
        $scope.currentTab = tab;
    }
}]);