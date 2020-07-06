angular.module('app.pokemon', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/pokemon/:pokemon', {
        templateUrl: 'pokemons/pokemon.html',
        controller: 'pokemonCtrl'
    });
}])

.controller('pokemonCtrl', ['$scope', '$http', '$routeParams', '$location',
    function($scope, $http, $routeParams, $location) {
        var pokemonName = $routeParams["pokemon"];
        console.log("loading details for pokemon: " + pokemonName);
        let pokemon = pokemonsMap[pokemonName];

        let cp = evaluateMaxCP(pokemon);
        pokemon.cp = cp;

        $scope.pokemon = pokemon;
    }
]);