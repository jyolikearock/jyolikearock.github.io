'use strict';

var ivsMap = getObject("pogoIvsMap");
console.log("Fetching cached IVs from local storage:", ivsMap);
if (!ivsMap) {
    ivsMap = {};
    setObject("pogoIvsMap", ivsMap);
}
var ivsId = 0;
var focusPokemonName = "";

var showTypeChart = false;
var showEvolutionFamily = false;

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
    $scope.currentMovesTab = currentMovesTab;
    $scope.types = types;
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

    // update global variables with user-defined values in url query params
    let params = $location.search();
    maxCp = validateCP(params["maxCp"]);
    atkIv = validateAtkIv(params["atkIv"]);
    defIv = validateDefIv(params["defIv"]);
    hpIv = validateHpIv(params["hpIv"]);

    // used for populating type-ahead dropdown
    $scope.pokemonNames = pokemonNames;

    $scope.onSelect = function($item, $model, $label) {
        console.log($item, $model, $label);
        goToPokemon($label)
    };

    // fetch latest pokemon data from data service
    $scope.pokemons = [];
    $scope.updatePokemons = function() {
        updatePokemonData($scope.pokemons);
        refreshTable();
    }

    function refreshTable() {
        $scope.$broadcast("refreshTable");
    }

    // get pokemon name if provided in route
    if (!focusPokemonName && $routeParams.pokemon) {
        focusPokemonName = $routeParams.pokemon;
    }
    if (focusPokemonName) {
        updatePokemon();
    }

    // for updating pokemon stats based on max CP
    $scope.updatePokemon = function() {
        updatePokemon();
        updateEvolutionFamily();
    }

    function updatePokemon() {
        if (focusPokemonName) {
            let pokemon = getPokemonData(focusPokemonName);
            level = pokemon._level;
            $scope.focusPokemon = pokemon;
        }
    }

    // for updating pokemon stats based on level
    $scope.updatePokemonWithLevel = function() {
        updatePokemonWithLevel();
        updateEvolutionFamily();
    }

    function updatePokemonWithLevel() {
        if (focusPokemonName) {
            $scope.focusPokemon = getPokemonDataWithLevel(focusPokemonName);
        }
    }

    // for toggling type chart
    $scope.showTypeChart = function() {
        return showTypeChart;
    }

    $scope.toggleTypeChart = function() {
        showTypeChart = !showTypeChart;
    }

    // for toggling evolution family
    $scope.showEvolutionFamily = function() {
        return showEvolutionFamily;
    }

    $scope.toggleEvolutionFamily = function() {
        showEvolutionFamily = !showEvolutionFamily;
    }

    $scope.evolutionFamily = [];
    if (focusPokemonName && $scope.focusPokemon.evolutionFamily) {
        $scope.focusPokemon.evolutionFamily.forEach(
            function(familyMemberName) {
                if (familyMemberName.toLowerCase() !== focusPokemonName) {
                    console.log("Getting stats for family member:", familyMemberName);
                    let familyMember = getPokemonDataWithLevel(familyMemberName);
                    $scope.evolutionFamily.push(familyMember);
                }
            }
        );
        console.log("Evolution family:", $scope.evolutionFamily);
    }

    function updateEvolutionFamily() {
        $scope.evolutionFamily.forEach(
            function(familyMember) {
                evaluateStatsWithLevel(familyMember, level, atkIv, defIv, hpIv);
            }
        )
    }

    // routing methods
    function getParams() {
        let params = $location.search();
        params.maxCp = maxCp;
        params.atkIv = atkIv;
        params.defIv = defIv;
        params.hpIv = hpIv;
        return params;
    }

    $scope.updateUrl = function() {
        let params = getParams();
        $location.search(params);
    }

    $scope.seeAllPokemon = function() {
        console.log("Going back to pokemon table");
        focusPokemonName = "";
        $scope.focusPokemonName = "";
        go("/pokemon");
    }

    $scope.goToPokemon = function(pokemonName) {
        goToPokemon(pokemonName);
    }

    function goToPokemon(pokemonName) {
        console.log("Routing to: " + pokemonName);
        let name = pokemonName.toLowerCase();
        focusPokemonName = name;
        $scope.focusPokemonName = name;

        let params = getParams();
        console.log("with params: " + JSON.stringify(params));
        if (!pokemonsMap[name]) {
            $location.path("/pokemon").search(params);
        }
        else {
            $location.path("/pokemon/" + name).search(params);
        }
    }

    $scope.go = function(path) {
        go(path);
    }

    function go(path) {
        let params = getParams();
        $location.path(path).search(params);
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
        newIvs.id = ivsId;
        ivsId++;
        newIvs.ivs = atkIv + " / " + defIv + " / " + hpIv;
        newIvs.atkIv = atkIv;
        newIvs.defIv = defIv;
        newIvs.hpIv = hpIv;
        newIvs.level = $scope.focusPokemon._level;
        newIvs.atk = $scope.focusPokemon._atk;
        newIvs.def = $scope.focusPokemon._def;
        newIvs.hp = $scope.focusPokemon._hp;
        newIvs.bulk = $scope.focusPokemon._bulk;
        newIvs.total = $scope.focusPokemon._total;
        newIvs.cp = $scope.focusPokemon._cp;

        ivs.push(newIvs);
        $scope.ivsMap = ivsMap;
        setObject("pogoIvsMap", ivsMap);
    }

    function updateIvs() {
        let ivs = $scope.ivsMap[$scope.focusPokemon.name];
        if (ivs && ivs.length > 0) {
            ivs.forEach(function(iv) {
                // evaluateStatsWithCpCap();
            })
        }
    }

    $scope.removeIvs = function(ivs) {
        let name = $scope.focusPokemon.name;
        let currentIvs = ivsMap[name];
        ivsMap[name] = currentIvs.filter(
            function(e) {
                return e.id !== ivs.id;
            }
        );
        $scope.ivsMap = ivsMap;
        setObject("pogoIvsMap", ivsMap);
    }

    $scope.getIvs = function() {
        return $scope.ivsMap[$scope.focusPokemon.name];
    }

    // for fetching move data for single pokemon
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
        $scope.currentMovesTab = tab;
    }

    $scope.isPvp = function() {
        return $scope.currentMovesTab.includes('pvp');
    }

    // utility methods
    function validateCP(cp) {
        let _cp = Number.parseInt(cp);
        _cp = 10 <= _cp && _cp <= 9999 ? _cp : maxCp;
        return _cp;
    }

    function validateAtkIv(iv) {
        let _iv = Number.parseInt(iv);
        _iv = 0 <= _iv && _iv <= 15 ? _iv : atkIv;
        return _iv;
    }

    function validateDefIv(iv) {
        let _iv = Number.parseInt(iv);
        _iv = 0 <= _iv && _iv <= 15 ? _iv : defIv;
        return _iv;
    }

    function validateHpIv(iv) {
        let _iv = Number.parseInt(iv);
        _iv = 0 <= _iv && _iv <= 15 ? _iv : hpIv;
        return _iv;
    }
}]);