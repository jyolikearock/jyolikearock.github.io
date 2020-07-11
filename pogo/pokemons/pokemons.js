'use strict';

var ivsMap = {};
var ivsId = 0;

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

.controller('pokemonsController', ['$scope', '$location', '$routeParams', '$timeout',
    function($scope, $location, $routeParams, $timeout) {

    // initialize page settings
    $scope.pageSize = pageSize;
    $scope.currentPage = 1;
    $scope.currentTab = currentTab;
    $scope.ivsMap = ivsMap;
    $scope.types = types;

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
    var pokemonName = $routeParams["pokemon"];
    $scope.updatePokemon = function() {
        $scope.pokemon = getPokemonData(pokemonName);
    }
    if (pokemonName) {
        $scope.updatePokemon();
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

    $scope.getPokemon = function(pokemonName) {
        let params = getParams();
        console.log("routing to: " + pokemonName);
        $location.path("/pokemon/" + pokemonName.toLowerCase()).search($location.search());
    }

    $scope.go = function(path) {
        let params = getParams();
        $location.path(path).search(params);
    }

    // for iv comparison on single-pokemon view
    $scope.showIvs = function() {
        let ivs = $scope.ivsMap[$scope.pokemon.name];
        return (ivs !== undefined && ivs.length > 0);
    }

    $scope.saveIvs = function() {
        let ivs = $scope.ivsMap[$scope.pokemon.name];
        if (ivs === undefined) {
            ivs = [];
            $scope.ivsMap[$scope.pokemon.name] = ivs;
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
        let currentIvs = $scope.ivsMap[name];
        $scope.ivsMap[name] = currentIvs.filter(
            function(e) {
                return e.id !== ivs.id;
            }
        );
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

    $scope.showTab = function(tab) {
        currentTab = tab;
        $scope.currentTab = tab;
    }

    $scope.isPvp = function() {
        return $scope.currentTab.includes('pvp');
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