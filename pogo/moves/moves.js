'use strict';

var currentMovesTab = localStorage.getItem("pogoCurrentMovesTab");
if (!currentMovesTab) {
    currentMovesTab = "pvpFast";
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
    $scope.currentMovesTab = currentMovesTab;

    // apply type filter and load data to tables
    updateMoves();

    // for switching between pve/pvp tabs
    $scope.showTab = function(tab) {
        currentMovesTab = tab;
        localStorage.setItem("pogoCurrentMovesTab", tab);
        $scope.currentMovesTab = tab;
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
        console.log("Found %d fast moves", filteredFastMoves.length);
        console.log("Found %d charge moves", filteredChargeMoves.length);
        $scope.fastMoves = filteredFastMoves;
        $scope.chargeMoves = filteredChargeMoves;
        $scope.$broadcast("refreshTable");
    }

    function isMoveType(move, type) {
        return (move.type === type);
    }
}]);