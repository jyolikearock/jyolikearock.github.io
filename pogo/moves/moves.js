'use strict';

var currentTab = localStorage.getItem("pogoMovesCurrentTab");
if (!currentTab) {
    currentTab = "pvpFast";
}
var moveTypeFilter = "";

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
    $scope.types = types;

    // apply type filter and load data to tables
    applyTypeFilter();

    // for switching between pve/pvp tabs
    $scope.showTab = function(tab) {
        currentTab = tab;
        localStorage.setItem("pogoMovesCurrentTab", tab);
        $scope.currentTab = tab;
    }

    // for filtering moves by type
    $scope.filterType = function(type) {
        if (moveTypeFilter === type) {
            moveTypeFilter = "";
        }
        else {
            moveTypeFilter = type;
        }

        applyTypeFilter();
    }

    function applyTypeFilter() {
        let filteredFastMoves = [];
        let filteredChargeMoves = [];
        if (moveTypeFilter === "") {
            filteredFastMoves = fastMoves;
            filteredChargeMoves = chargeMoves;
        }
        else {
            filteredFastMoves = fastMoves.filter(
                function(move) {
                    return isType(move, moveTypeFilter)
                }
            );
            filteredChargeMoves = chargeMoves.filter(
                function(move) {
                    return isType(move, moveTypeFilter);
                }
            )
        }
        $scope.fastMoves = filteredFastMoves;
        $scope.chargeMoves = filteredChargeMoves;
        $scope.$broadcast("refreshTable");
    }

    function isType(move, type) {
        return (move.type === type);
    }

    $scope.isTypeActive = function(type) {
        return (moveTypeFilter === type);
    }
}]);