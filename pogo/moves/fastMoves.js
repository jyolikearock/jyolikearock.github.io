'use strict';

var fastMoveDataLoaded = false;

angular.module('app.fastMoves', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/fastMoves', {
    templateUrl: 'moves/fastMoves.html',
    controller: 'fastMovesController'
  });
}])

.controller('fastMovesController', ['$scope', function($scope) {

    $scope.pageSize = pageSize;

    if (!fastMoveDataLoaded) {
        fastMoves.forEach(
            function(move) {
                let pd = move.pvpDamage;
                let pe = move.pvpEnergy;
                let pt = move.pvpTurns;

                let dpt = pd / pt;
                let ept = pe / pt;
                let dptEpt = dpt * ept;

                dpt = round(dpt);
                move.pvpDpt = dpt;
                ept = round(ept);
                move.pvpEpt = ept;
                dptEpt = round(dptEpt);
                move.pvpTotal = dptEpt;

                let ed = move.pveDamage;
                let ee = move.pveEnergy;
                let ec = move.pveCooldown;

                let dps = ed / ec;
                let eps = ee / ec;
                let dpsEps = dps * eps;

                dps = round(dps);
                move.pveDps = dps;
                eps = round(eps);
                move.pveEps = eps;
                dpsEps = round(dpsEps);
                move.pveTotal = dpsEps;
            }
        );
        fastMoveDataLoaded = true;
    }

    $scope.moves = fastMoves;

    function round(n) {
        return Math.round(n * 100) / 100;
    }
}]);