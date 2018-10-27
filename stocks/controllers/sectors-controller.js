app.controller("sectorsController", function($scope, $routeParams, stockMarketService) {

  $scope.sector = $routeParams.sector;

  if ($scope.sector) {

    // for coloring nav bar
    $scope.currentPage = $scope.sector;

    // if symbols for this sector was previously loaded, just re-use that data
    if (symbolsBySector[$scope.sector]) {
      console.log("Re-using symbols from cache for sector: " + $scope.sector);
      $scope.symbols = symbolsBySector[$scope.sector].slice();
    }

    // otherwise, call the service
    else {
      console.log("Listing symbols for sector: " + $scope.sector);
      listSymbols($scope.sector);
    }
  }

  function listSymbols(sector) {
    stockMarketService.listSymbols(sector).then(
      function(resp) {

        var symbols = [];

        // extract key data for each symbol
        resp.data.forEach(function(e) {
          var symbol = {};
          symbol.symbol       = e.symbol;
          symbol.companyName  = e.companyName;
          symbol.price        = e.close;
          symbol.change       = e.changePercent * 100;

          symbols.push(symbol);
        });

        $scope.symbols = symbols;
        console.log("Got symbols for sector: " + sector);

        // store results in global cache
        symbolsBySector[$scope.sector] = symbols.slice();
      });
  }

});