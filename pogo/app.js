'use strict';

// Declare app level module which depends on views, and core components
var app = angular.module('app', [
  'ngRoute',
  'smart-table',
  'app.pokemons',
  'app.pokemon',
  'app.fastMoves',
  'app.chargeMoves'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/pokemon'});
}]);
