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
    $scope.showSettings = localStorage.getItem("pogoShowSettings");

    // extract user-defined values from url query params
    let params = $location.search();
    let maxCP = validateCP(params["maxCP"]);
    let atkIv = validateIv(params["atkIv"]);
    let defIv = validateIv(params["defIv"]);
    let hpIv = validateIv(params["hpIv"]);
    $scope.maxCP = maxCP;
    $scope.atkIv = atkIv;
    $scope.defIv = defIv;
    $scope.hpIv = hpIv;

    // populate pokemon stats based on user inputs
    console.log("Evaluating stats for " + pokemons.length + " pokemon");
    pokemons.forEach(
        function(pokemon) {
            evaluateStatsHelper(pokemon);
        }
    );
    $scope.pokemons = pokemons;

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
        let maxCP = validateCP($scope.maxCP);
        let atkIv = validateIv($scope.atkIv);
        let defIv = validateIv($scope.defIv);
        let hpIv = validateIv($scope.hpIv);
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

    // utility methods
    $scope.setCurrentPage = function(page) {
        $scope.currentPage = page;
    }

    $scope.getRowNum = function(rowOnPage) {
        return (($scope.currentPage - 1) * $scope.pageSize) + rowOnPage + 1;
    }

    $scope.toggleSettings = function() {
        $scope.showSettings = !$scope.showSettings;
        console.log("toggling settings; display: " + $scope.showSettings);
        localStorage.setItem("pogoShowSettings", $scope.showSettings);
    }

    function validateCP(cp) {
        let _cp = Number.parseInt(cp);
        _cp = 10 <= _cp && _cp <= 9999 ? _cp : 9999;
        return _cp;
    }

    function validateIv(iv) {
        let _iv = Number.parseInt(iv);
        _iv = 0 <= _iv && _iv <= 15 ? _iv : 15;
        return _iv;
    }
}]);