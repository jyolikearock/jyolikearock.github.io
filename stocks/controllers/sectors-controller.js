app.controller("sectorsController", function($scope, $routeParams, stockMarketService) {

  $scope.sector = $routeParams.sector;

  if ($scope.sector) {
    console.log("Listing symbols for sector: " + $scope.sector);
    listSymbols($scope.sector);
  }

  function listSymbols(sector) {
    stockMarketService.listSymbols(sector).then(
      function(resp) {
        $scope.symbols = resp;
        console.log("Got symbols for sector: " + sector);
      });
  }

});