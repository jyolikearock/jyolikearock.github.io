'use strict';

var chargeMoveDataLoaded = false;

angular.module('app.chargeMoves', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chargeMoves', {
    templateUrl: 'moves/chargeMoves.html',
    controller: 'chargeMovesController'
  });
}])

.controller('chargeMovesController', ['$scope', function($scope) {
    if (!chargeMoveDataLoaded) {
        chargeMoves.forEach(
            function(move) {
                let pd = move.pvpDamage;
                let pe = move.pvpEnergy;

                let dpe = pe === 0 ? 0 : pd / pe;
                dpe = round(dpe);
                move.pvpDpe = dpe;

                let ed = move.pveDamage;
                let ee = move.pveEnergy;
                let ec = move.pveCooldown;

                let dps = ec === 0 ? 0 : ed / ec;
                let eDpe = ee === 0 ? 0 : ed / ee;
                let dpsDpe = dps * dpe;

                dps = round(dps);
                move.pveDps = dps;
                eDpe = round(eDpe);
                move.pveDpe = eDpe;
                dpsDpe = round(dpsDpe);
                move.pveTotal = dpsDpe;
            }
        );
        chargeMoveDataLoaded = true;
    }

    console.log("loading charge moves with length: " + chargeMoves.length);
    $scope.moves = chargeMoves;

    function round(n) {
        return Math.round(n * 100) / 100;
    }
}]);