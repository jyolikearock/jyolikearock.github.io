var targetDummy = {
    "name": "TargetDummy",
    "type": ["None"],
    "stats": {
        1500: {
            "atk": 100,
            "def": 160,
            "hp": 9999
        },
        2500: {
            "atk": 130,
            "def": 185,
            "hp": 9999
        },
        9999: {
            "atk": 220,
            "def": 185,
            "hp": 9999
        }
    },
    "fastMoves": ["Dummy Fast Move"],
    "chargeMoves": ["Dummy Charge Move"],
}

var targetDummyFastMove = {
    "name": "TargetDummyFastMove",
    "type": "None",
    "pvpDamage": 4,
    "pvpEnergy": 3,
    "pvpTurns": 1,
    "pveDamage": 16,
    "pveEnergy": 12,
    "pveCooldown": 1
};

var targetDummyChargeMove = {
    "name": "TargetDummyChargeMove",
    "type": "None",
    "pvpDamage": 80,
    "pvpEnergy": 45,
    "pveDamage": 130,
    "pveEnergy": 50,
    "pveCooldown": 3
}

var currentMovesetsTab = "pvp";
var pvp = true;
var enemyPokemonName = "Target Dummy"
var enemyPokemon = targetDummy;
var enemyMoveset = {
    "name": "Dummy Fast Move, Dummy Charge Move",
    "fastMove": "Dummy Fast Move",
    "chargeMove": "Dummy Charge Move"
};
var enemyMovesets = [enemyMoveset];

var shields = 0;
var currentTypeTab = "pokemonTypes";

angular.module('app.movesets', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/movesets', {
    templateUrl: 'movesets/movesets.html',
    controller: 'movesetsController'
  });
}])

.controller('movesetsController', ['$scope', '$location', function($scope, $location) {

    $scope.pageSize = pageSize;
    $scope.pokemonNames = pokemonNames;
    $scope.pokemonNames.push("Target Dummy");

    $scope.enemyPokemonName = enemyPokemonName;
    $scope.enemyPokemon = enemyPokemon;
    $scope.enemyMovesets = enemyMovesets;
    $scope.enemyMoveset = enemyMoveset;

    $scope.currentTypeTab = currentTypeTab;
    $scope.shields = shields;

    // initial load of moveset data
    populateMovesets();

    $scope.populateMovesets = function() {
        populateMovesets();
    }

    // for restricting typeahead to prefix match
    $scope.startsWith = function(actual, expected) {
        return actual.toLowerCase().startsWith(expected.toLowerCase());
    }

    // getters and setters for options
    $scope.isPvp = function() {
        return isPvp();
    }

    function isPvp() {
        return pvp;
    }

    $scope.setShields = function(num) {
        shields = num;
        $scope.shields = shields;
    }

    $scope.setCurrentTypeTab = function(tab) {
        currentTypeTab = tab;
        $scope.currentTypeTab = tab;
    }

    $scope.goToPokemon = function(pokemonName) {
        $location.path("pokemon/" + pokemonName.toLowerCase());
    }

    // for setting battle type
    $scope.showTab = function(tab) {
        currentMovesetsTab = tab;
        pvp = currentMovesetsTab === 'pvp';
        populateMovesets();
    }

    $scope.getCurrentMovesetsTab = function() {
        return currentMovesetsTab;
    }

    // for setting enemy pokemon
    $scope.getEnemyPokemonName = function() {
        return enemyPokemonName;
    }

    $scope.setEnemyPokemon = function(name) {
        enemyPokemonName = name;
        if (name === "Target Dummy") {
            enemyPokemon = targetDummy;
        }
        else {
            enemyPokemon = getPokemon(name);
        }
        $scope.enemyPokemon = enemyPokemon;

        enemyMovesets = [];
        enemyPokemon.fastMoves.forEach(
            function(fm) {
                enemyPokemon.chargeMoves.forEach(
                    function(cm) {
                        if (cm === "Frustration (Shadow)") {
                            return;
                        }
                        let moveset = {};
                        moveset.name = fm + ", " + cm;
                        moveset.fastMove = fm;
                        moveset.chargeMove = cm;
                        enemyMovesets.push(moveset);
                    }
                );
            }
        );
        if (enemyMovesets.length <= 20) {
            enemyMovesets.unshift({"name": "Not Known"});
        }
        $scope.enemyMovesets = enemyMovesets;

        enemyMoveset = enemyMovesets[0];
        $scope.enemyMoveset = enemyMoveset;
    }

    $scope.setEnemyMoveset = function(moveset) {
        console.log("Setting enemy moveset:", moveset);
        enemyMoveset = moveset;
    }

    function populateMovesets() {

        let movesets = [];

        // initialize enemy and enemy moves
        let enemy = enemyPokemon;
        let selectedEnemyMovesets = [];

        // if enemy moveset is not known, try all of them
        if (enemyMoveset.name === "Not Known") {
            selectedEnemyMovesets = enemyMovesets;
        }
        else {
            selectedEnemyMovesets.push(enemyMoveset);
        }
        console.log("Analyzing movesets against enemy moveset(s):", selectedEnemyMovesets);

        // get pokemon list based on current settings
        let filteredPokemon = [];
        updateAllPokemon(filteredPokemon);

        // set cp cutoff for determining whether a pokemon is eligible to evaluate
        let cpCutoff = cpCap * 0.933;
        if (cpCap > 5000 || !pvp) {
            cpCutoff = 2600;
        }

        let count = 0;
        filteredPokemon.forEach(function(pokemon) {
            // skip pokemon who don't make the cp cutoff
            if (pokemon.maxCp < cpCutoff) {
                return;
            }

            // iterate through pokemon's movesets
            pokemon.fastMoves.forEach(function(fmName) {
                let fm = fastMovesMap[fmName];
                pokemon.chargeMoves.forEach(function(cmName) {
                    if (cmName === "Frustration (Shadow)") {
                        return;
                    }

                    let cm = chargeMovesMap[cmName];
                    if (cm === undefined) {
                        console.log("Could not find charge move:", cmName);
                        return;
                    }

                    // apply move type filter
                    if (moveTypeFilter) {
                        if (fm.type !== moveTypeFilter && cm.type !== moveTypeFilter) {
                            return;
                        }
                    }

                    // evaluate this moveset based on its worst matchup, in case the enemy moveset is not known
                    let worstMoveset = {};
                    worstMoveset.score = 99999;
                    worstMoveset.dps = 99999;

                    // iterate through all of enemy's selected moveset(s)
                    selectedEnemyMovesets.forEach(function(enemyMoveset) {

                        if (enemyMoveset.name === "Not Known") {
                            return;
                        }

                        // set enemy moveset
                        let enemyFm = fastMovesMap[enemyMoveset.fastMove];
                        if (!enemyFm) {
                            enemyFm = targetDummyFastMove;
                        }
                        let enemyCm = chargeMovesMap[enemyMoveset.chargeMove];
                        if (!enemyCm) {
                            enemyCm = targetDummyChargeMove;
                        }

                        // initialize basic moveset data
                        let moveset = {};
                        moveset.pokemon = pokemon.name;
                        moveset.fastMove = fm.name;
                        moveset.fmType = fm.type;
                        moveset.chargeMove = cm.name;
                        moveset.cmType = cm.type;

                        // simulate battle and get results
                        let battleResult = simulateBattle(pokemon, fm, cm, enemy, enemyFm, enemyCm, cpCap, shields, currentMovesetsTab);

                        // evaluate moveset based on results
                        evaluateMoveset(moveset, battleResult, shields, currentMovesetsTab);

                        if (isPvp) {
                            if (moveset.score < worstMoveset.score) {
                                worstMoveset = moveset;
                            }
                        }
                        else {
                            if (moveset.score < worstMoveset.score) {
                                worstMoveset = moveset;
                            }
                        }

                        count++;
                    });
                    movesets.push(worstMoveset);
                });
            });

        });

        $scope.movesets = movesets;
        console.log("Analyzed " + count + " movesets");
    }

    // given a moveset and a battle result, evaluates the moveset based on the battle result and populates a number
    // of attributes on the moveset
    function evaluateMoveset(moveset, battleResult, shields, battleType) {
        let state1 = battleResult.attackerState; // attacker
        let state2 = battleResult.defenderState; // defender

        let ttfa = state1.moveData.ttfa;
        let totalDamageDealt = state1.fmDamageDealt + state1.cmDamageDealt;
        let timeSurvived = battleResult.turns;
        let dps = totalDamageDealt / timeSurvived;

        let hpRemaining = Math.max(0, state1.hp);
        let win = state2.hp <= 0;

        let chargeMovesFired = state1.chargeMovesFired;
        let shieldsBroken = state1.shieldsBroken;
        let shieldsUsed = state2.shieldsBroken;
        let dmgDist = getDamageDistribution(state1.fmDamageDealt, state1.cmDamageDealt);

        let score = 0;

        if (battleType === 'pvp') {
            // if enemy is target dummy, score is just based on total damage dealt
            if (state2.initialHp >= 9999) {
                score += round1(100 * totalDamageDealt / 251);
            }
            else {
                score = 50;

                let weight = 100 / (2 + shields);

                // gain or lose up to 'weight/2' points for each shield broken or spent
                score += ((weight / 2) * (shieldsBroken - shieldsUsed));

                // gain up to 'weight' points for damage dealt
                score += weight * Math.min(state2.initialHp, totalDamageDealt) / state2.initialHp;

                // lose up to 'weight' points for damage taken
                score -= weight * (1 - hpRemaining / state1.initialHp);
            }
        }
        else if (battleType === 'raid') {
            let totalRaidDamage = 0;
            let deaths = 6;
            let partySize = 1;
            let timeLimit = 120;
            let combatTime = deaths * timeSurvived;
            if (combatTime > timeLimit) {
                combatTime = timeLimit;
            }
            totalRaidDamage = partySize * dps * combatTime;
            score = round(totalRaidDamage / 10);
        }
        else {
            // if enemy is target dummy, score is just based on total damage dealt
            if (state2.initialHp >= 9999) {
                score += round1(100 * totalDamageDealt / 467);
            }
            else {
                timeSurvived = state2.initialHp / dps;
                score += 90 - timeSurvived;
                let deaths = Math.min(6, state2.initialHp / totalDamageDealt);
                score += 10 * (1 - deaths / 6);
            }
        }

        moveset.ttfa = ttfa;
        moveset.total = totalDamageDealt;
        moveset.time = round1(timeSurvived);
        moveset.dps = round2(dps);
        moveset.hpRemaining = hpRemaining;
        moveset.charges = chargeMovesFired;
        moveset.shieldsUsed = shieldsUsed;
        moveset.shieldsBroken = shieldsBroken;
        moveset.dmgDist = dmgDist;
        moveset.score = round1(score);
    }

    // given 2 sets of pokemon, their moves, and the battle type, simulates a battle between them until one dies
    // returns battle stats, including:
    //      damage dealt, hp remaining, charge moves fired, ttfa, shields remaining, fm/cm damage ratio
    function simulateBattle(p1, fm1, cm1, p2, fm2, cm2, cpCap, shields, battleType) {

        let battleResult = {};

        // initialize battle state for each pokemon
        let state1 = initializeBattleState(p1, cpCap, shields, battleType, false);
        let state2 = initializeBattleState(p2, cpCap, shields, battleType, true);

        // initialize move data for each pokemon
        let isPvp = battleType === 'pvp';
        let md1 = initializeMoveData(state1, state2, fm1, cm1, isPvp, false);
        state1.moveData = md1;
        let md2 = initializeMoveData(state2, state1, fm2, cm2, isPvp, true);
        state2.moveData = md2;

        // determines when the next action takes place
        let next1 = 0;
        let next2 = 0;
        if (isPvp) {
            next1 = md1.fmcd;
            next2 = md2.fmcd;
        }

        // initialize current turn
        let turn = next1 < next2 ? next1 : next2;

        // loop until one pokemon dies
        while (state1.hp > 0 && state2.hp > 0) {

            let delayChargeMove = false;

            // pokemon 1 attacks
            if (turn === next1) {
                // use charge move if ready
                if (state1.chargeReady) {
                    // if both charge moves are ready, decide who goes first based on atk stat
                    // if pokemon 2 has priority, delay pokemon 1's charge move until after pokemon 2's
                    if (isPvp && state2.chargeReady && turn === next2 && state2.atk > state1.atk) {
                        delayChargeMove = true;
                    }
                    else {
                        // apply charge move dmg
                        applyChargeMove(state1, state2, isPvp);
                        if (isPvp) {
                            next1 += md1.fmcd;
                        }
                        else {
                            next1 += md1.cmcd;
                        }

                        // if enemy has died as a result of charge move, battle is over
                        // (unlike fast moves, which can result in simultaneous knock out)
                        if (state2.hp <= 0) {
                            break;
                        }
                    }
                }

                // otherwise, just use fast move
                else {
                    applyFastMove(state1, state2, md1, isPvp);
                    if (state1.chargeReady && isPvp) {
                        next1 += md1.cmcd;
                    }
                    else {
                        next1 += md1.fmcd;
                    }
                }
            }

            // pokemon 2 attacks
            if (turn === next2) {
                // use charge move if ready
                if (state2.chargeReady) {
                    // apply charge move dmg
                    applyChargeMove(state2, state1, isPvp);
                    if (isPvp) {
                        next2 += md2.fmcd;
                    }
                    else {
                        next2 += md2.cmcd;
                    }

                    // if enemy has died as a result of charge move, battle is over
                    // (unlike fast moves, which can result in simultaneous knock out)
                    if (state1.hp <= 0) {
                        break;
                    }
                }

                // otherwise, just use fast move
                else {
                    applyFastMove(state2, state1, md2, isPvp);
                    if (state2.chargeReady && isPvp) {
                        next2 += md2.cmcd;
                    }
                    else {
                        next2 += md2.fmcd;
                    }
                }
            }

            // apply pokemon 1's charge move now if it lost the CMP tie
            if (delayChargeMove) {
                // apply charge move dmg
                applyChargeMove(state1, state2, isPvp);
                if (isPvp) {
                    next1 += md1.fmcd;
                }
                else {
                    next1 += md1.cmcd;
                }

                // if enemy has died as a result of charge move, battle is over
                // (unlike fast moves, which can result in simultaneous knock out)
                if (state2.hp <= 0) {
                    break;
                }
            }

            // in pvp, if 1 pokemon has charge move queued up, delay that charge move until the enemy's next action
            if (isPvp) {
                if (state1.chargeReady) {
                    next1 = next2;
                }
                else if (state2.chargeReady) {
                    next2 = next1;
                }
            }

            battleResult.turns = turn;

            // update turn based on when the next action will take place
            turn = next1 < next2 ? next1 : next2;
        }

        battleResult.attackerState = state1;
        battleResult.defenderState = state2;
        return battleResult;
    }

    // initializes and returns a battle state for a given pokemon
    // safe to mutate without affecting the original pokemon's stats
    function initializeBattleState(pokemon, cpCap, shields, battleType, isDefender) {
        let stats = pokemon.stats[cpCap];
        if (battleType !== 'pvp') {
            stats = pokemon.stats[9999];
            if (battleType === 'raid' && !isDefender) {
                stats = pokemon.stats[35];
            }
        }
        let battleState = {};
        battleState.types = pokemon.type;
        battleState.hp = Math.floor(stats.hp);
        if (isDefender) {
            if (battleType === 'raid') {
                battleState.hp = 15000;
            }
            else if (battleType === 'gym') {
                battleState.hp *= 2;
            }
        }
        battleState.initialHp = battleState.hp;

        battleState.atk = stats.atk;
        battleState.def = stats.def;
        battleState.atkStage = 4;
        battleState.defStage = 4;

        battleState.shields = shields;
        battleState.energy = 0;
        battleState.chargeReady = false;

        battleState.fmDamageDealt = 0;
        battleState.cmDamageDealt = 0;
        battleState.chargeMovesFired = 0;
        battleState.shieldsBroken = 0;

        return battleState;
    }

    // initializes and returns move data for the attacker, taking into account stats, enemy typing, and battle type
    function initializeMoveData(attacker, defender, fm, cm, isPvp, isDefender) {
        let moveData = {};
        moveData.fm = fm;
        moveData.cm = cm;
        moveData.fmd = getMoveDamage(fm, attacker, defender, isPvp);
        moveData.cmd = getMoveDamage(cm, attacker, defender, isPvp);
        if (isPvp) {
            moveData.ttfa = Math.ceil(cm.pvpEnergy / fm.pvpEnergy) * fm.pvpTurns;
            moveData.atfa = Math.ceil(cm.pvpEnergy / fm.pvpEnergy);
            moveData.fmcd = fm.pvpTurns;
            moveData.cmcd = 1;
            moveData.fme = fm.pvpEnergy;
            moveData.cme = cm.pvpEnergy;
            if (cm.pvpEffectChance === 100) {
                moveData.hasEffect = true;
                moveData.effectStat = cm.pvpEffectStat;
                moveData.effectDelta = cm.pvpEffectDelta;
                moveData.effectTarget = cm.pvpEffectTarget;
            }
        }
        else {
            moveData.ttfa = round1(cm.pveEnergy / fm.pveEnergy * fm.pveCooldown);
            moveData.atfa = Math.ceil(cm.pveEnergy / fm.pveEnergy);
            moveData.fmcd = fm.pveCooldown;
            moveData.cmcd = cm.pveCooldown;
            if (isDefender) {
                moveData.fmcd += 2;
                moveData.cmcd += 2;
            }
            moveData.fme = fm.pveEnergy;
            moveData.cme = cm.pveEnergy;
        }

        return moveData;
    }

    // simulates a charge move being used by attacker on defender, and updates their stats (in place) accordingly
    function applyChargeMove(attacker, defender, isPvp) {
        let md1 = attacker.moveData;
        let md2 = defender.moveData;
        attacker.energy -= md1.cme;
        attacker.chargeReady = attacker.energy >= md1.cme;
        attacker.chargeMovesFired++;

        // in pve, increase energy based on damage taken
        if (!isPvp) {
            defender.hp -= md1.cmd;
            defender.energy += Math.ceil(md1.cmd / 2);
            attacker.cmDamageDealt += md1.cmd;
            if (defender.energy > 100) {
                defender.energy = 100;
            }
        }

        else {
            // use shield if available and if attack would be fatal
            let isNextAttackFatal = md1.cmd + md1.fmd * md1.atfa * defender.shields >= defender.hp;
            if (defender.shields > 0 && (isNextAttackFatal || defender.initialHp >= 9999)) {
                defender.shields--;
                defender.hp--;
                attacker.cmDamageDealt++;
                attacker.shieldsBroken++;
            }
            else {
                defender.hp -= md1.cmd;
                attacker.cmDamageDealt += md1.cmd;
            }

            // apply buffs/debuffs for moves that have 100% stat change (rng moves not considered for simplicity)
            if (md1.hasEffect) {
                let target = attacker;
                if (md1.effectTarget === "O") {
                    target = defender;
                }

                let updateAtk = md1.effectStat === "A" || md1.effectStat === "AD";
                let updateDef = md1.effectStat === "D" || md1.effectStat === "AD";

                // update stats
                if (updateAtk) {
                    applyBuff(target, md1, true);
                }
                if (updateDef) {
                    applyBuff(target, md1, false);
                }

                // update move damage
                md1.fmd = getMoveDamage(md1.fm, attacker, defender, isPvp);
                md1.cmd = getMoveDamage(md1.cm, attacker, defender, isPvp);
                md2.fmd = getMoveDamage(md2.fm, defender, attacker, isPvp);
                md2.cmd = getMoveDamage(md2.cm, defender, attacker, isPvp);
            }
        }
    }

    // applies buff/debuff on affected pokemon
    function applyBuff(target, moveData, isAtk) {
        // get current stat stage
        let stage = target.defStage;
        if (isAtk) {
            stage = target.atkStage;
        }
        let oldMult = statModifiers[stage];

        // change stage
        stage += moveData.effectDelta;
        if (stage < 0) {
            stage = 0;
        }
        else if (stage > 8) {
            stage = 8;
        }
        let newMult = statModifiers[stage];

        // apply stat change
        if (isAtk) {
            target.atk = target.atk * newMult / oldMult;
            target.atkStage = stage;
        }
        else {
            target.def = target.def * newMult / oldMult;
            target.defStage = stage;
        }
    }

    // simulates a fast move being used by attacker on defender, and updates their stats (in place) accordingly
    function applyFastMove(attacker, defender, moveData, isPvp) {
        attacker.energy += moveData.fme;
        if (attacker.energy >= moveData.cme) {
            attacker.chargeReady = true;
        }
        attacker.fmDamageDealt += moveData.fmd;
        defender.hp -= moveData.fmd;
        if (!isPvp) {
            defender.energy += Math.ceil(moveData.fmd / 2);
            if (defender.energy > 100) {
                defender.energy = 100;
            }
        }
    }

    function getMoveDamage(move, attackingPokemonState, defendingPokemonState, isPvp) {
        let movePower = isPvp ? move.pvpDamage : move.pveDamage;

        // calc stab multiplier
        let stab = attackingPokemonState.types.includes(move.type) ? 1.2 : 1.0;

        // calc type effectiveness multiplier
        let defType = "";
        if (defendingPokemonState.types.length === 1) {
            defType = defendingPokemonState.types[0];
        }
        else {
            defType = getKeyForDualType(defendingPokemonState.types[0], defendingPokemonState.types[1]);
        }
        let typeEff = typeChartByDefender[move.type][defType];
        if (!typeEff) {
            typeEff = 1.0;
        }

        // pvp bonus
        let pvpMultiplier = isPvp ? 1.3 : 1.0;

        let atk = attackingPokemonState.atk;
        let def = defendingPokemonState.def;

        return Math.floor(0.5 * movePower * atk / def * stab * typeEff * pvpMultiplier) + 1;
    }

    function getDamageDistribution(fmd, cmd) {
        let totalDamage = fmd + cmd;
        return round(100 * fmd / totalDamage) + "%/" + round(100 * cmd / totalDamage) + "%"
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