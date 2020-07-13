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

    // apply type filter and load data to tables
    updateMoves();

    // for switching between pve/pvp tabs
    $scope.showTab = function(tab) {
        currentTab = tab;
        localStorage.setItem("pogoMovesCurrentTab", tab);
        $scope.currentTab = tab;
    }

    $scope.updateMoves = function() {
        updateMoves();
    }

    function updateMoves() {
        let filteredFastMoves = [];
        let filteredChargeMoves = [];
        if (moveTypeFilter === "") {
            filteredFastMoves = fastMoves;
            filteredChargeMoves = chargeMoves;
        }
        else {
            filteredFastMoves = fastMoves.filter(
                function(move) {
                    return isMoveType(move, moveTypeFilter)
                }
            );
            filteredChargeMoves = chargeMoves.filter(
                function(move) {
                    return isMoveType(move, moveTypeFilter);
                }
            )
        }
        $scope.fastMoves = filteredFastMoves;
        $scope.chargeMoves = filteredChargeMoves;
        $scope.$broadcast("refreshTable");
    }

    function isMoveType(move, type) {
        return (move.type === type);
    }
}]);