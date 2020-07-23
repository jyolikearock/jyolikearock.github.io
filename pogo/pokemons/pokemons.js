'use strict';

var ivsMap = getObject("pogoIvsMap");
console.log("Fetching cached IVs from local storage:", ivsMap);
if (!ivsMap) {
    ivsMap = {};
    setObject("pogoIvsMap", ivsMap);
}
var ivsId = 0;
var focusPokemon = "";

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
    $scope.focusPokemon = focusPokemon;

    // reroute to single view if there is a pokemon selected
    if (focusPokemon && !$routeParams.pokemon) {
        console.log("Routing back to last viewed pokemon: %s", focusPokemon);
        goToPokemon(focusPokemon);
    }

    // update global variables with user-defined values in url query params
    let params = $location.search();
    maxCp = validateCP(params["maxCp"]);
    atkIv = validateAtkIv(params["atkIv"]);
    defIv = validateDefIv(params["defIv"]);
    hpIv = validateHpIv(params["hpIv"]);

    // used for populating type-ahead dropdown
    $scope.pokemonNames = pokemonNames;

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
    if (!focusPokemon && $routeParams.pokemon) {
        focusPokemon = $routeParams.pokemon;
    }
    if (focusPokemon) {
        updatePokemon();
    }

    // stat fetching methods
    $scope.updatePokemon = function() {
        updatePokemon();
    }

    function updatePokemon() {
        if (focusPokemon) {
            let pokemon = getPokemonData(focusPokemon);
            level = pokemon._level;
            $scope.pokemon = pokemon;
        }
    }

    $scope.updatePokemonWithLevel = function() {
        updatePokemonWithLevel();
    }

    function updatePokemonWithLevel() {
        if (focusPokemon) {
            $scope.pokemon = getPokemonDataWithLevel(focusPokemon);
        }
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
        focusPokemon = "";
        $scope.focusPokemon = "";
        go("/pokemon");
    }

    $scope.goToPokemon = function(pokemonName) {
        goToPokemon(pokemonName);
    }

    function goToPokemon(pokemonName) {
        console.log("Routing to: " + pokemonName);
        let name = pokemonName.toLowerCase();
        focusPokemon = name;
        $scope.focusPokemon = name;

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

    // for iv comparison on single-pokemon view
    $scope.showIvs = function() {
        let ivs = $scope.ivsMap[$scope.pokemon.name];
        return (ivs !== undefined && ivs.length > 0);
    }

    $scope.saveIvs = function() {
        let name = $scope.pokemon.name;
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
        newIvs.level = $scope.pokemon._level;
        newIvs.atk = $scope.pokemon._atk;
        newIvs.def = $scope.pokemon._def;
        newIvs.hp = $scope.pokemon._hp;
        newIvs.bulk = $scope.pokemon._bulk;
        newIvs.total = $scope.pokemon._total;
        newIvs.cp = $scope.pokemon._cp;

        ivs.push(newIvs);
        $scope.ivsMap = ivsMap;
        setObject("pogoIvsMap", ivsMap);
    }

    function updateIvs() {
        let ivs = $scope.ivsMap[$scope.pokemon.name];
        if (ivs && ivs.length > 0) {
            ivs.forEach(function(iv) {
                // evaluateStatsWithCpCap();
            })
        }
    }

    $scope.removeIvs = function(ivs) {
        let name = $scope.pokemon.name;
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
        return $scope.ivsMap[$scope.pokemon.name];
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