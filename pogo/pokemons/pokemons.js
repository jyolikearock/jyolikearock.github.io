'use strict';

angular.module('app.pokemons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/pokemon?', {
        templateUrl: 'pokemons/pokemons.html',
        controller: 'pokemonsCtrl'
    })
    .when('/pokemon/:maxCP/:atkIv/:defIv/:hpIv', {
        templateUrl: 'pokemons/pokemons.html',
        controller: 'pokemonsCtrl'
    });
}])

.controller('pokemonsCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {

    // initialize page settings
    $scope.pageSize = 20;
    $scope.currentPage = 1;

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
    pokemons.forEach(
        function(pokemon) {
            evaluateStats(pokemon, maxCP, atkIv, defIv, hpIv);
        }
    );

    $scope.pokemons = pokemons;

    // for refreshing stats in real-time
    $scope.evaluateLevel = function(pokemon) {
        let maxCP = validateCP($scope.maxCP);
        let atkIv = validateIv($scope.atkIv);
        let defIv = validateIv($scope.defIv);
        let hpIv = validateIv($scope.hpIv);
        evaluateStats(pokemon, maxCP, atkIv, defIv, hpIv);
        return pokemon._level;
    }

    $scope.evaluateCP = function(pokemon) {
        return evaluateCP(pokemon, 40, $scope.atkIv, $scope.defIv, $scope.hpIv);
    }

    $scope.evaluateBulk = function(pokemon) {
        return evaluateBulk(pokemon, 40, $scope.defIv, $scope.hpIv);
    }

    $scope.evaluateTotal = function(pokemon) {
        return evaluateTotal(pokemon, 40, $scope.atkIv, $scope.defIv, $scope.hpIv);
    }

    $scope.toggleFocusPokemon = function(pokemon) {
        console.log("Toggling focus pokemon: " + pokemon);
        if ($scope.focusPokemon === pokemon) {
            $scope.focusPokemon = "";
        }
        else {
            $scope.focusPokemon = pokemon;
        }
    }

    $scope.isFocusPokemon = function(pokemon) {
        return pokemon === $scope.focusPokemon;
    }

    // routing methods
    $scope.updateMaxCP = function(maxCP) {
        goto(maxCP, $scope.atkIv, $scope.defIv, $scope.hpIv);
    }

    $scope.updateAtkIv = function(iv) {
        goto(maxCP, iv, $scope.defIv, $scope.hpIv);
    }

    $scope.updateDefIv = function(iv) {
        goto(maxCP, $scope.atkIv, iv, $scope.hpIv);
    }

    $scope.updateHpIv = function(iv) {
        goto(maxCP, $scope.atkIv, $scope.defIv, iv);
    }

    $scope.refreshPage = function() {
        goto($scope.maxCP, $scope.atkIv, $scope.defIv, $scope.hpIv);
    }

    function goto(maxCP, atkIv, defIv, hpIv) {
        let path = "/pokemon";
        let params = {};
        params.maxCP = maxCP;
        params.atkIv = atkIv;
        params.defIv = defIv;
        params.hpIv = hpIv;
        $location.path(path).search(params);
    }

    // utility methods
    $scope.setCurrentPage = function(page) {
        $scope.currentPage = page;
    }

    $scope.getRowNum = function(rowOnPage) {
        return (($scope.currentPage - 1) * $scope.pageSize) + rowOnPage + 1;
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