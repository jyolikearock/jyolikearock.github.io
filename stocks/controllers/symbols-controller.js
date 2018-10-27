app.controller("symbolsController", function($scope, $routeParams, stockMarketService) {

  $scope.symbol = $routeParams.symbol;

  // for coloring nav bar
  $scope.currentPage = "Symbols";

  if ($scope.symbol) {
    console.log("Loading data for symbol: ", $scope.symbol);
  }

});