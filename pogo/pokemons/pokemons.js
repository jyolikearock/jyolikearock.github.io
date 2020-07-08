'use strict';

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

.controller('pokemonsController', ['$scope', '$http', '$location', '$routeParams',
    function($scope, $http, $location, $routeParams) {

    // initialize page settings
    $scope.pageSize = pageSize;
    $scope.currentPage = 1;

    // extract user-defined values from url query params
    let params = $location.search();
    maxCP = validateCP(params["maxCP"]);
    atkIv = validateAtkIv(params["atkIv"]);
    defIv = validateDefIv(params["defIv"]);
    hpIv = validateHpIv(params["hpIv"]);
    $scope.maxCP = maxCP;
    $scope.atkIv = atkIv;
    $scope.defIv = defIv;
    $scope.hpIv = hpIv;

    // populate pokemon stats based on user inputs
    $scope.refreshStats = function() {
        pokemons.forEach(
            function(pokemon) {
                evaluateStatsHelper(pokemon);
            }
        )
        $scope.pokemons = pokemons;
    }
    console.log("Evaluating stats for " + pokemons.length + " pokemon");
    $scope.refreshStats();

    // get pokemon name if provided in route
    var pokemonName = $routeParams["pokemon"];
    console.log("loading details for pokemon: " + pokemonName);
    if (pokemonName) {
        let pokemon = pokemonsMap[pokemonName];
        evaluateStatsHelper(pokemon);
        $scope.pokemon = pokemon;
    }

    // for refreshing stats in real-time
    $scope.refreshStatsAndGetName = function(pokemon) {
        evaluateStatsHelper(pokemon);
        return pokemon.name;
    }

    function evaluateStatsHelper(pokemon) {
        maxCP = validateCP($scope.maxCP);
        atkIv = validateAtkIv($scope.atkIv);
        defIv = validateDefIv($scope.defIv);
        hpIv = validateHpIv($scope.hpIv);
        evaluateStatsWithCpCap(pokemon, maxCP, atkIv, defIv, hpIv);
    }

    // routing methods
    function getParams() {
        let params = $location.search();
        params.maxCP = $scope.maxCP;
        params.atkIv = $scope.atkIv;
        params.defIv = $scope.defIv;
        params.hpIv = $scope.hpIv;
        return params;
    }

    $scope.updateMaxCP = function(maxCP) {
        $scope.maxCP = maxCP;
    }

    $scope.refreshPage = function() {
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

    // utility methods
    $scope.setCurrentPage = function(page) {
        $scope.currentPage = page;
    }

    $scope.getRowNum = function(rowOnPage) {
        return (($scope.currentPage - 1) * $scope.pageSize) + rowOnPage + 1;
    }

    $scope.shouldShowSettings = function() {
        return showSettings;
    }

    $scope.toggleSettings = function() {
        showSettings = !showSettings;
        console.log("toggling settings; display: " + showSettings);
    }

    function validateCP(cp) {
        let _cp = Number.parseInt(cp);
        _cp = 10 <= _cp && _cp <= 9999 ? _cp : maxCP;
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