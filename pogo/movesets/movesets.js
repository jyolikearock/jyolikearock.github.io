var greatLeagueTargetDummy = {
    "_atk": 150,
    "_def": 160,
    "type": []
};

var ultraLeagueTargetDummy = {
    "_atk": 190,
    "_def": 180,
    "type": []
};

var masterLeagueTargetDummy = {
    "_atk": 225,
    "_def": 200,
    "type": []
};

var targetDummyFastMove = {
    "pvpDamage": 8,
    "pvpEnergy": 7,
    "pvpTurns": 2,
    "pveDamage": 8,
    "pveEnergy": 8,
    "pveCooldown": 1
};

var targetDummyChargeMove = {
    "pvpDamage": 80,
    "pvpEnergy": 40,
    "pveDamage": 80,
    "pveEnergy": 40,
    "pveCooldown": 2
}

var shields = 0;
var isPvp = true;

var stop = false;

angular.module('app.movesets', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/movesets', {
    templateUrl: 'movesets/movesets.html',
    controller: 'movesetsController'
  });
}])

.controller('movesetsController', ['$scope', function($scope) {

    $scope.pageSize = pageSize;
    $scope.isPvp = isPvp;

    // initial load of moveset data
    populateMovesets();

    $scope.populateMovesets = function() {
        populateMovesets();
    }

    $scope.setPvp = function(_isPvp) {
        isPvp = _isPvp;
        $scope.isPvp = _isPvp;
    }

    var currentPokemon = "";
    function populateMovesets() {

        let movesets = [];

        let pokemonsCopy = [];
        updatePokemonData(pokemonsCopy);

        let targetDummy = masterLeagueTargetDummy;
        if (maxCp <= 2500) {
            targetDummy = ultraLeagueTargetDummy;
        }
        if (maxCp <= 1500) {
            targetDummy = greatLeagueTargetDummy;
        }

        pokemonsCopy.forEach(function(pokemon) {
            if (pokemon.maxCp < 1430) {
                return;
            }

            currentPokemon = pokemon.name;

            pokemon.fastMoves.forEach(function(fmName) {
                let fm = fastMovesMap[fmName];
                pokemon.chargeMoves.forEach(function(cmName) {
                    let cm = chargeMovesMap[cmName];

                    if (moveTypeFilter) {
                        if (fm.type !== moveTypeFilter && cm.type !== moveTypeFilter) {
                            return;
                        }
                    }

                    let moveset = {};
                    moveset.pokemon = pokemon.name;
                    moveset.fastMove = fm.name;
                    moveset.fmType = fm.type;
                    moveset.fmPvpDamage = fm.pvpDamage;
                    moveset.fmPvpEnergy = fm.pvpEnergy;
                    moveset.fmPvpTurns = fm.pvpTurns;

                    moveset.chargeMove = cm.name;
                    moveset.cmType = cm.type;
                    moveset.cmPvpDamage = cm.pvpDamage;
                    moveset.cmPvpEnergy = cm.pvpEnergy;

                    let pvpTtfa = Math.ceil(cm.pvpEnergy / fm.pvpEnergy) * fm.pvpTurns;

                    let enemyDpt = getMoveDamage(targetDummyFastMove, targetDummy, pokemon);
                    log("Enemy DPT: " + enemyDpt);

                    let turnsToDie = Math.floor(pokemon._hp / enemyDpt);
                    log("Turns survived: " + turnsToDie);

                    let totalEnergy = Math.floor(turnsToDie / fm.pvpTurns) * fm.pvpEnergy;
                    log("Total energy generated: " + totalEnergy);

                    let fmDamage = getMoveDamage(fm, pokemon, targetDummy);
                    log("FM damage: " + fmDamage);

                    let totFmDmg = Math.floor(turnsToDie / fm.pvpTurns) * fmDamage;
                    log("Total FM damage: " + totFmDmg);

                    let cmDamage = getMoveDamage(cm, pokemon, targetDummy);
                    log("CM damage: " + cmDamage);

                    let totCmDmg = Math.max(0, Math.floor(totalEnergy / cm.pvpEnergy) - shields) * cmDamage;
                    log("Total CM damage: " + totCmDmg);

                    let totalDamage = totFmDmg + totCmDmg;
                    log("Total damage: " + totalDamage);

                    let theoreticalPvpDpt = (fmDamage + cmDamage * fm.pvpEnergy / cm.pvpEnergy) / fm.pvpTurns;
                    log("Theoretical DPT: " + theoreticalPvpDpt);

                    let pvpDpt = totalDamage / turnsToDie;
                    log("Actual DPT: " + pvpDpt);

                    moveset.pvpTtfa = pvpTtfa;
                    moveset.pvpDpt = round2(pvpDpt);
                    moveset.pvpTotal = totalDamage;
                    moveset.pvpDmgDist = round(100 * totFmDmg / totalDamage) + "% / " + round(100 * totCmDmg / totalDamage) + "%";

                    movesets.push(moveset);

                    stop = true;
                });
            });
        });

        $scope.movesets = movesets;
    }

    function getMoveDamage(move, atkPokemon, defPokemon) {
        let movePower = isPvp ? move.pvpDamage : move.pveDamage;
        let stab = atkPokemon.type.includes(move.type) ? 1.2 : 1.0;
        return Math.floor(0.5 * movePower * atkPokemon._atk / defPokemon._def * stab) + 1;
    }

    function log(message) {
        if (currentPokemon === "None") {
            console.log(message);
        }
    }
}]);