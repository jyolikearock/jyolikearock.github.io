'use strict';

var ivsMap = {};
var ivsId = 0;
var typeFilter = [];
var oneTypeOnly = false;

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

.controller('pokemonsController', ['$scope', '$http', '$location', '$routeParams', '$timeout',
    function($scope, $http, $location, $routeParams, $timeout) {

    // initialize page settings
    $scope.pageSize = pageSize;
    $scope.currentPage = 1;
    $scope.currentTab = currentTab;
    $scope.ivsMap = ivsMap;
    $scope.types = types;

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
    // for refreshing stats in real-time
    function evaluateStatsHelper(pokemon) {
        maxCP = validateCP($scope.maxCP);
        atkIv = validateAtkIv($scope.atkIv);
        defIv = validateDefIv($scope.defIv);
        hpIv = validateHpIv($scope.hpIv);
        evaluateStatsWithCpCap(pokemon, maxCP, atkIv, defIv, hpIv);
    }

    $scope.refreshStats = function() {
        pokemons.forEach(
            function(pokemon) {
                evaluateStatsHelper(pokemon);
            }
        )
    }
    console.log("Evaluating stats for " + pokemons.length + " pokemon");
    $scope.refreshStats();
    $scope.pokemons = pokemons;

    // get pokemon name if provided in route
    var pokemonName = $routeParams["pokemon"];
    console.log("loading details for pokemon: " + pokemonName);
    if (pokemonName) {
        let pokemon = pokemonsMap[pokemonName];
        evaluateStatsHelper(pokemon);
        $scope.pokemon = pokemon;
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

    // type filter
    $scope.toggleTypeFilter = function(type) {
        let index = typeFilter.indexOf(type);

        if (index > -1) {
            if (oneTypeOnly || typeFilter.length === 2) {
                typeFilter.splice(index, 1);
                oneTypeOnly = false;
            }
            else {
                oneTypeOnly = true;
            }
        }
        else {
            if (typeFilter.length === 2) {
                typeFilter = [];
            }
            typeFilter.push(type);
            oneTypeOnly = false;
        }

        applyTypeFilter();
    }

    $scope.isTypeActive = function(type) {
        return (typeFilter.indexOf(type) > -1);
    }

    function applyTypeFilter() {
        let temp = [];

        if (typeFilter.length === 0) {
            temp = pokemons;
        }

        else {
            temp = pokemons.filter(
                function(pokemon) {
                    return isType(pokemon, typeFilter);
                }
            );
            console.log("filtered pokemon: " + temp.length);
        }

        $scope.pokemons = temp;
        $scope.$broadcast('refreshTable');
    }

    function isType(pokemon, typesToMatch) {
        for (let i = 0; i < typesToMatch.length; i++) {
            let type = typesToMatch[i];
            if (!pokemon.type.includes(type)) {
                return false;
            }
            else if (oneTypeOnly && pokemon.type.length > 1) {
                return false;
            }
        }
        return true;
    }

    // for iv comparison
    $scope.showIvs = function() {
        let ivs = $scope.ivsMap[$scope.pokemon.name];
        return (ivs !== undefined && ivs.length > 0);
    }

    $scope.minIvs = function() {
        console.log("setting IVs to 0");
        $scope.atkIv = 0;
        $scope.defIv = 0;
        $scope.hpIv = 0;
    }

    $scope.maxIvs = function() {
        console.log("setting IVs to 15");
        $scope.atkIv = 15;
        $scope.defIv = 15;
        $scope.hpIv = 15;
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
        newIvs.ivs = $scope.atkIv + " / " + $scope.defIv + " / " + $scope.hpIv;
        newIvs.level = $scope.pokemon._level;
        newIvs.atk = $scope.pokemon._atk;
        newIvs.def = $scope.pokemon._def;
        newIvs.hp = $scope.pokemon._hp;
        newIvs.bulk = $scope.pokemon._bulk;
        newIvs.total = $scope.pokemon._total;
        newIvs.cp = $scope.pokemon._cp;

        ivs.push(newIvs);
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

    // for fetching move data
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
    $scope.setCurrentPage = function(page) {
        $scope.currentPage = page;
    }

    $scope.getRowNum = function(rowOnPage) {
        return (($scope.currentPage - 1) * $scope.pageSize) + rowOnPage + 1;
    }

    $scope.shouldshowOptions = function() {
        return showOptions;
    }

    $scope.toggleOptions = function() {
        showOptions = !showOptions;
        console.log("toggling options; display: " + showOptions);
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