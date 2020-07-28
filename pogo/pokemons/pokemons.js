'use strict';

var allPokemon = [];

var ivsMap = getObject("pogoIvsMap");
console.log("Fetching cached IVs from local storage:", ivsMap);
if (!ivsMap) {
    ivsMap = {};
    setObject("pogoIvsMap", ivsMap);
}
var focusPokemonName = "";

var showEvolutionFamily = false;
var showTypeChart = false;

angular.module('app.pokemons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/pokemon?', {
        templateUrl: 'pokemons/pokemons.html',
        controller: 'pokemonsController'
    })
    .when('/pokemon/:pokemon?', {
        templateUrl: 'pokemons/pokemon.html',
        controller: 'pokemonsController'
    });
}])

.controller('pokemonsController', ['$scope', '$location', '$routeParams',
    function($scope, $location, $routeParams) {

    // initialize page settings
    $scope.pageSize = pageSize;
    $scope.types = types;
    $scope.cpCap = cpCap;

    // initialize vars for focus pokemon
    $scope.currentMovesTab = currentMovesTab;
    $scope.ivsMap = ivsMap;
    $scope.focusPokemonName = focusPokemonName;

    // reroute to single view if there is a pokemon selected
    if (focusPokemonName && !$routeParams.pokemon) {
        console.log("Routing back to last viewed pokemon: %s", focusPokemonName);
        goToPokemon(focusPokemonName);
    }
    else {
        focusPokemonName = $routeParams.pokemon;
    }

    // used for populating type-ahead dropdown
    $scope.pokemonNames = pokemonNames;

    // fetch latest pokemon data from data service
    if (allPokemon.length === 0) {
        updateAllPokemon(allPokemon);
        updateTableStats();
        console.log("Loaded data for %d pokemon", allPokemon.length);
    }
    $scope.allPokemon = allPokemon;

    // get pokemon name if provided in route
    if (!focusPokemonName && $routeParams.pokemon) {
        focusPokemonName = $routeParams.pokemon;
    }

    // set focus pokemon in scope
    if (focusPokemonName) {

        let focusPokemon = getPokemon(focusPokemonName);

        // initialize focus pokemon stats if not available already
        if (!focusPokemon.displayedStats) {
            console.log("Using cp cap %d stats to initialize %s", cpCap, focusPokemonName);
            focusPokemon.displayedStats = focusPokemon.stats[cpCap];
        }
        if (!focusPokemon.displayedIvs) {
            let ivs = {};
            ivs.atkIv = focusPokemon.bestIvs[cpCap].atkIv;
            ivs.defIv = focusPokemon.bestIvs[cpCap].defIv;
            ivs.hpIv = focusPokemon.bestIvs[cpCap].hpIv;
            focusPokemon.displayedIvs = ivs;
        }

        $scope.focusPokemon = focusPokemon;
        $scope.ivs = focusPokemon.displayedIvs;
    }

    /**
     * BEGIN METHODS
     */

    // refresh displayed pokemon list based on current filters
    $scope.updateAllPokemon = function() {
        updateAllPokemon(allPokemon);
    }

    // updates stats displayed on table based on current cp cap
    $scope.updateTableStats = function() {
        updateTableStats();
    }

    function updateTableStats() {
        allPokemon.forEach(
            function(pokemon) {
                pokemon.tableStats = pokemon.stats[cpCap];
            }
        )
        refreshTable();
    }

    // forces smart-tables to be refreshed
    // should be used when table content has changed, but length of table has not
    function refreshTable() {
        $scope.$broadcast("refreshTable");
    }

    // for updating pokemon stats based on max CP
    $scope.updatePokemonWithCpCap = function() {
        updatePokemonWithCpCap();
        updateEvolutionFamily();
    }

    function updatePokemonWithCpCap() {
        if (focusPokemonName) {
            let stats = getDetailedStatsWithCpCap($scope.focusPokemon, cpCap, $scope.focusPokemon.displayedIvs);
            $scope.focusPokemon.displayedStats = stats;
        }
    }

    // for updating pokemon stats based on level
    $scope.updatePokemonWithLevel = function() {
        updatePokemonWithLevel();
        updateEvolutionFamily();
    }

    function updatePokemonWithLevel() {
        if (focusPokemonName) {
            let stats = getDetailedStatsWithLevel(
                    $scope.focusPokemon,
                    $scope.focusPokemon.displayedStats.level,
                    $scope.focusPokemon.displayedIvs);
            $scope.focusPokemon.displayedStats = stats;
        }
    }

    // for updating ivs
    $scope.setAtkIv = function(atkIv) {
        atkIv = validateIv(atkIv);
        $scope.ivs.atkIv = atkIv;
    }

    $scope.setDefIv = function(defIv) {
        defIv = validateIv(defIv);
        $scope.ivs.defIv = defIv;
    }

    $scope.setHpIv = function(hpIv) {
        hpIv = validateIv(hpIv);
        $scope.ivs.hpIv = hpIv;
    }

    function validateIv(iv) {
        if (iv < 0) {
            return 0;
        }
        else if (iv > 15) {
            return 15;
        }
        else {
            return iv;
        }
    }

    $scope.optimizeIvs = function() {
        console.log("Optimizing IVs for pokemon %s and cp cap %d", focusPokemonName, cpCap);
        $scope.ivs.atkIv = $scope.focusPokemon.bestIvs[cpCap].atkIv;
        $scope.ivs.defIv = $scope.focusPokemon.bestIvs[cpCap].defIv;
        $scope.ivs.hpIv = $scope.focusPokemon.bestIvs[cpCap].hpIv;
        updatePokemonWithCpCap($scope.focusPokemon, cpCap, $scope.ivs.atkIv, $scope.ivs.defIv, $scope.ivs.hpIv);
    }

    // for toggling type chart
    $scope.showTypeChart = function() {
        return showTypeChart;
    }

    $scope.toggleTypeChart = function() {
        showTypeChart = !showTypeChart;
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
    }

    // for toggling evolution family
    $scope.showEvolutionFamily = function() {
        return showEvolutionFamily;
    }

    $scope.toggleEvolutionFamily = function() {
        showEvolutionFamily = !showEvolutionFamily;
    }

    // initialize evolution family
    $scope.evolutionFamily = [];
    if (focusPokemonName && $scope.focusPokemon.evolutionFamily) {
        $scope.focusPokemon.evolutionFamily.forEach(
            function(familyMemberName) {
                if (familyMemberName.toLowerCase() !== focusPokemonName) {
                    let familyMember = getPokemon(familyMemberName);
                    $scope.evolutionFamily.push(familyMember);
                }
            }
        );
        updateEvolutionFamily();
    }

    function updateEvolutionFamily() {
        $scope.evolutionFamily.forEach(
            function(familyMember) {
                familyMember.familyStats = getDetailedStatsWithLevel(
                        familyMember,
                        $scope.focusPokemon.displayedStats.level,
                        $scope.ivs);
            }
        )
    }

    // route to all pokemon page
    $scope.seeAllPokemon = function() {
        console.log("Going back to pokemon table");
        focusPokemonName = "";
        $scope.focusPokemonName = "";
        go("/pokemon");
    }

    // routes to focus pokemon page
    $scope.goToPokemon = function(pokemonName) {
        goToPokemon(pokemonName);
    }

    function goToPokemon(pokemonName) {
        console.log("Routing to: " + pokemonName);
        let name = pokemonName.toLowerCase();
        focusPokemonName = name;
        $scope.focusPokemonName = name;
        if (!pokemonsMap[name]) {
            $location.path("/pokemon");
        }
        else {
            $location.path("/pokemon/" + name);
        }
    }

    function go(path) {
        $location.path(path);
    }

    // for iv comparison on focus pokemon
    $scope.showIvs = function() {
        let ivs = $scope.ivsMap[$scope.focusPokemon.name];
        return (ivs !== undefined && ivs.length > 0);
    }

    $scope.saveIvs = function() {
        let name = $scope.focusPokemon.name;
        let ivs = ivsMap[name];
        if (!ivs) {
            ivs = [];
            ivsMap[name] = ivs;
        }

        let newIvs = {};
        let ivsId = ivs.lastId + 1;
        if (!ivsId) {
            ivsId = 0;
        }
        newIvs.id = ivsId;

        let atkIv = $scope.ivs.atkIv;
        let defIv = $scope.ivs.defIv;
        let hpIv = $scope.ivs.hpIv;
        newIvs.ivs = atkIv + " / " + defIv + " / " + hpIv;
        newIvs.atkIv = atkIv;
        newIvs.defIv = defIv;
        newIvs.hpIv = hpIv;

        newIvs.level = $scope.focusPokemon.displayedStats.level;
        newIvs.atk = $scope.focusPokemon.displayedStats.displayedAtk;
        newIvs.def = $scope.focusPokemon.displayedStats.displayedDef;
        newIvs.hp = $scope.focusPokemon.displayedStats.displayedHp;
        newIvs.bulk = $scope.focusPokemon.displayedStats.bulk;
        newIvs.total = $scope.focusPokemon.displayedStats.total;
        newIvs.cp = $scope.focusPokemon.displayedStats.cp;
        newIvs.cpCap = cpCap;

        ivs.push(newIvs);
        ivs.lastId = ivsId;
        $scope.ivsMap = ivsMap;
        setObject("pogoIvsMap", ivsMap);
    }

    $scope.loadIvs = function(ivs) {
        console.log("Loading IVs:", ivs.ivs);
        $scope.ivs.atkIv = ivs.atkIv;
        $scope.ivs.defIv = ivs.defIv;
        $scope.ivs.hpIv = ivs.hpIv;
        cpCap = ivs.cpCap;
        updatePokemonWithCpCap($scope.focusPokemon, cpCap, ivs.atkIv, ivs.defIv, ivs.hpIv);
    }

    $scope.removeIvs = function(ivs) {
        let name = $scope.focusPokemon.name;
        let currentIvs = ivsMap[name];
        ivsMap[name] = currentIvs.filter(
            function(e) {
                return e.id !== ivs.id;
            }
        );
        if (ivsMap[name].length === 0) {
            delete ivsMap[name];
        }
        $scope.ivsMap = ivsMap;
        setObject("pogoIvsMap", ivsMap);
    }

    $scope.getIvs = function() {
        return $scope.ivsMap[$scope.focusPokemon.name];
    }

    // for fetching move data for focus pokemon
    $scope.getFastMoves = function(pokemon) {
        let fastMoves = [];
        pokemon.fastMoves.forEach(
            function(move) {
                fastMoves.push(fastMovesMap[move]);
            }
        )
        return fastMoves;
    }

    $scope.getChargeMoves = function(pokemon) {
        let chargeMoves = [];
        pokemon.chargeMoves.forEach(
            function(move) {
                chargeMoves.push(chargeMovesMap[move]);
            }
        )
        return chargeMoves;
    }

    $scope.showMovesTab = function(tab) {
        currentMovesTab = tab;
        localStorage.setItem("pogoCurrentMovesTab", currentMovesTab);
        $scope.currentMovesTab = tab;
    }

    $scope.isPvp = function() {
        return $scope.currentMovesTab.includes('pvp');
    }
}]);