var greatLeagueTargetDummy = {
    "_atk": 140,
    "_def": 140,
    "type": []
};

var ultraLeagueTargetDummy = {
    "_atk": 175,
    "_def": 175,
    "type": []
};

var masterLeagueTargetDummy = {
    "_atk": 205,
    "_def": 205,
    "type": []
};

var targetDummyFastMove = {
    "pvpDamage": 5,
    "pvpEnergy": 4,
    "pvpTurns": 1,
    "pveDamage": 20,
    "pveEnergy": 16,
    "pveCooldown": 2
};

var targetDummyChargeMove = {
    "pvpDamage": 95,
    "pvpEnergy": 40,
    "pveDamage": 120,
    "pveEnergy": 48,
    "pveCooldown": 3
}

var shields = 0;
var isPvp = true;
var actualDps = true;

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
    $scope.shields = shields;
    $scope.actualDps = actualDps;

    // initial load of moveset data
    populateMovesets();

    $scope.populateMovesets = function() {
        populateMovesets();
    }

    $scope.setPvp = function(_isPvp) {
        isPvp = _isPvp;
        $scope.isPvp = _isPvp;
    }

    $scope.setShields = function(num) {
        shields = num;
        $scope.shields = shields;
    }

    $scope.setActualDps = function(bool) {
        actualDps = bool;
        $scope.actualDps = actualDps;
    }

    var currentPokemon = "";
    var currentFm = "";
    var currentCm = "";
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

        let count = 0;
        pokemonsCopy.forEach(function(pokemon) {
            if (pokemon.maxCp < 1430) {
                return;
            }

            currentPokemon = pokemon.name;

            pokemon.fastMoves.forEach(function(fmName) {
                let fm = fastMovesMap[fmName];
                currentFm = fm.name;
                pokemon.chargeMoves.forEach(function(cmName) {
                    let cm = chargeMovesMap[cmName];
                    currentCm = cm.name;

                    if (moveTypeFilter) {
                        if (fm.type !== moveTypeFilter && cm.type !== moveTypeFilter) {
                            return;
                        }
                    }

                    let moveset = {};
                    moveset.pokemon = pokemon.name;
                    moveset.fastMove = fm.name;
                    moveset.fmType = fm.type;
                    moveset.chargeMove = cm.name;
                    moveset.cmType = cm.type;

                    if (isPvp) {
                        moveset.pvpTtfa = Math.ceil(cm.pvpEnergy / fm.pvpEnergy) * fm.pvpTurns;

                        // simulate fight
                        if (actualDps) {
                            fightPvp(pokemon, fm, cm, targetDummy, targetDummyFastMove, targetDummyChargeMove, shields, moveset);
                        }
                        // calculate theoretical dps from fm and cm stats
                        else {
                            let fmd = getMoveDamage(fm, pokemon, targetDummy);
                            let cmd = getMoveDamage(cm, pokemon, targetDummy);
                            let fmdt = cm.pvpEnergy / fm.pvpEnergy * fmd;
                            moveset.pvpTotal = round(cmd + fmdt);
                            moveset.pvpDpt = round2(moveset.pvpTotal / moveset.pvpTtfa);
                            moveset.pvpDmgDist = getDamageDistribution(fmdt, cmd);
                            moveset.pvpCharges = 1;
                        }
                    }
                    else {
                        let efmd = getMoveDamage(targetDummyFastMove, targetDummy, pokemon);
                        let ecmd = getMoveDamage(targetDummyChargeMove, targetDummy, pokemon);
                        let eatfa = Math.ceil(targetDummyChargeMove.pveEnergy / targetDummyFastMove.pveEnergy);
                        let ettfa = eatfa * targetDummyFastMove.pveCooldown + targetDummyChargeMove.pveCooldown;
                        let efmdpa = eatfa * efmd;
                        let edpa = efmdpa + ecmd;

                        let hp = pokemon._hp;
                        let chargeMovesTaken = Math.floor(hp / edpa);
                        let timeToDie = chargeMovesTaken * ettfa;
                        hp = hp % edpa;
                        if (hp < efmdpa) {
                            timeToDie += Math.ceil(hp / efmd) * targetDummyFastMove.pveCooldown;
                        }
                        else {
                            timeToDie += ettfa;
                        }
                        log("Total time survived: " + timeToDie);

                        let fmd = getMoveDamage(fm, pokemon, targetDummy);
                        let cmd = getMoveDamage(cm, pokemon, targetDummy);
                        let atfa = Math.ceil(cm.pveEnergy / fm.pveEnergy);
                        let ttfa = atfa * fm.pveCooldown + cm.pveCooldown;
                        let activations = Math.floor(timeToDie / ttfa);

                        let cmdt = activations * cmd;
                        let fmdt = Math.floor((timeToDie - activations * cm.pveCooldown) / fm.pveCooldown) * fmd;
                        let total = cmdt + fmdt;
                        moveset.pveTtfa = round1(ttfa);
                        moveset.pveTotal = total;
                        moveset.pveDps = round2(total / timeToDie);
                        moveset.pveDmgDist = getDamageDistribution(fmdt, cmdt);
                        moveset.pveCharges = activations;
                    }
                    movesets.push(moveset);
                    count++;
                });
            });
        });

        $scope.movesets = movesets;
        console.log("Analyzed " + count + " movesets");
    }

    function fightPvp(pokemon, fm1, cm1, targetDummy, fm2, cm2, numShields, moveset) {
        let fmdt = 0;
        let cmdt = 0;

        let e1 = 0;
        let e2 = 0;

        let s1 = numShields;
        let s2 = numShields;

        let a1 = pokemon._atk;
        let d1 = pokemon._def;
        let hp = pokemon._hp;
        let cms = 0;

        let a2 = targetDummy._atk;
        let d2 = targetDummy._def;

        log("pokemon stats: " + a1 + ", " + d1);
        log("target dummy stats: " + a2 + ", " + d2);
        log("hp remaining: " + hp);

        let nextAttack1 = fm1.pvpTurns;
        let cmReady1 = false;

        let nextAttack2 = fm2.pvpTurns;
        let cmReady2 = false;

        let fmd1 = 0;
        let cmd1 = 0;
        let fmd2 = 0;
        let cmd2 = 0;
        fmd1 = getMoveDamageWithStats(fm1, pokemon, targetDummy, a1, d2);
        cmd1 = getMoveDamageWithStats(cm1, pokemon, targetDummy, a1, d2);
        fmd2 = getMoveDamageWithStats(fm2, targetDummy, pokemon, a2, d1);
        cmd2 = getMoveDamageWithStats(cm2, targetDummy, pokemon, a2, d1);

        let hasEffect = cm1.pvpEffectChance === 100;
        let effectStat = cm1.pvpEffectStat;
        let stage = 4;

        let turn = 0;
        while (hp > 0) {

            // increment turn
            turn++;

            // pokemon attacks
            if (turn === nextAttack1) {
                // fast attack
                if (!cmReady1) {
                    fmdt += fmd1;
                    e1 += fm1.pvpEnergy;
                }

                // charge attack
                else {
                    log("pokemon charge attack on turn " + turn);
                    if (s2 > 0) {
                        s2--;
                        cmdt++;
                    }
                    else {
                        cmdt += cmd1;
                    }
                    e1 -= cm1.pvpEnergy;
                    cmReady1 = false;
                    cms++;

                    // apply buffs/debuffs
                    if (hasEffect && stage != 0 && stage != 8) {
                        stage += cm1.pvpEffectDelta;
                        let mult = statModifiers[stage];
                        if (cm1.pvpEffectTarget === "S") {
                            if (effectStat === "A") {
                                a1 = Math.floor(pokemon._atk * mult);
                            }
                            else if (effectStat === "D") {
                                d1 = Math.floor(pokemon._def * mult);
                            }
                            else {
                                a1 = Math.floor(pokemon._atk * mult);
                                d1 = Math.floor(pokemon._def * mult);
                            }
                        }
                        else {
                            if (effectStat === "A") {
                                a2 = Math.floor(targetDummy._atk * mult);
                            }
                            else if (effectStat === "D") {
                                d2 = Math.floor(targetDummy._def * mult);
                            }
                            else {
                                a2 = Math.floor(targetDummy._atk * mult);
                                d2 = Math.floor(targetDummy._def * mult);
                            }
                        }
                        log("Buffs applied; pokemon stats: " + a1 + ", " + d1);
                        log("target dummy stats: " + a2 + ", " + d2);
                        log("hp remaining: " + hp);

                        fmd1 = getMoveDamageWithStats(fm1, pokemon, targetDummy, a1, d2);
                        cmd1 = getMoveDamageWithStats(cm1, pokemon, targetDummy, a1, d2);
                        fmd2 = getMoveDamageWithStats(fm2, targetDummy, pokemon, a2, d1);
                        cmd2 = getMoveDamageWithStats(cm2, targetDummy, pokemon, a2, d1);
                    }
                }

                // determine when next attack happens
                if (e1 >= cm1.pvpEnergy) {
                    cmReady1 = true;
                    nextAttack1 = turn + 1;
                }
                else {
                    nextAttack1 = turn + fm1.pvpTurns;
                }
            }

            // target dummy attacks
            if (turn === nextAttack2) {

                // fast attack
                if (!cmReady2) {
                    hp -= fmd2;
                    e2 += fm2.pvpEnergy;
                }

                // charge attack
                else {
                    log("enemy charge attack on turn " + turn);
                    if (s1 > 0) {
                        s1--;
                        hp--;
                    }
                    else {
                        hp -= cmd2;
                    }
                    e2 -= cm2.pvpEnergy;
                    cmReady2 = false;
                }

                // determine when to attack next
                if (e2 >= cm2.pvpEnergy) {
                    cmReady2 = true;
                    nextAttack2 = turn + 1;
                }
                else {
                    nextAttack2 = turn + fm2.pvpTurns;
                }
            }

            // delay charge moves until the opponent's next fast move
            if (cmReady1) {
                nextAttack1 = nextAttack2;
            }
            else if (cmReady2) {
                nextAttack2 = nextAttack1;
            }
        }

        let totalDamage = fmdt + cmdt;
        log("Total FM Damage: " + fmdt);
        log("Total CM Damage: " + cmdt);

        moveset.pvpDpt = round2(totalDamage / turn);
        moveset.pvpTotal = totalDamage;
        moveset.pvpCharges = cms;
        moveset.pvpDmgDist = getDamageDistribution(fmdt, cmdt);
    }

    function getMoveDamageWithStats(move, atkPokemon, defPokemon, a, d) {
        let movePower = isPvp ? move.pvpDamage : move.pveDamage;
        let stab = atkPokemon.type.includes(move.type) ? 1.2 : 1.0;
        return Math.floor(0.5 * movePower * a / d * stab * 1.3) + 1;
    }

    function getMoveDamage(move, atkPokemon, defPokemon) {
        let movePower = isPvp ? move.pvpDamage : move.pveDamage;
        let stab = atkPokemon.type.includes(move.type) ? 1.2 : 1.0;
        return Math.floor(0.5 * movePower * atkPokemon._atk / defPokemon._def * stab * 1.3) + 1;
    }

    function getDamageDistribution(fmd, cmd) {
        let totalDamage = fmd + cmd;
        return round(100 * fmd / totalDamage) + "%/" + round(100 * cmd / totalDamage) + "%"
    }

    function log(message) {
        if (currentPokemon === "Mewtwos") {
            if (currentFm === "Psycho Cut") {
                if (currentCm === "Psystrike (Event)") {
                    console.log(message);
                }
            }
        }
    }
}]);

var statModifiers = {
    0: 0.5,
    1: 4/7,
    2: 4/6,
    3: 0.8,
    4: 1,
    5: 1.25,
    6: 1.5,
    7: 1.75,
    8: 2,
};