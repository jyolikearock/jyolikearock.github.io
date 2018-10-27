app.controller("rankingsController", function($scope, stockMarketService) {

  // for coloring nav bar
  pageInfo.currentPage = "Rankings";

  // kick off the process with the first step
  getAllSymbols();
  // --> get data for each symbol
  // --> evaluate symbols
  // --> store results

  // get all symbols
  $scope.allSymbols = [];
  function getAllSymbols() {

    // determine which sectors haven't been queried yet
    var sectorsToGet = [];
    sectors.forEach(function(sector) {
      if (symbolsBySector[sector]) {
        $scope.allSymbols = $scope.allSymbols.concat(symbolsBySector[sector]);
      }
      else {
        sectorsToGet.push(sector);
      }
    });

    // get symbols for sectors
    var callsCompleted = 0;
    sectorsToGet.forEach(function(sector) {
      stockMarketService.listSymbols(sector).then(
        function(resp) {
          var symbols = [];

          // extract symbol name
          resp.forEach(function(e) {
            symbols.push(e.symbol);
          });
          console.log("Got symbols for sector: " + sector);

          // append to list of all symbols
          $scope.allSymbols = $scope.allSymbols.concat(symbols);

          // store results in global cache
          symbolsBySector[sector] = symbols.slice();

          callsCompleted++;
          // continue to next step if all sectors have been processed
          if (callsCompleted == sectorsToGet.length) {
            // TODO
          }
        }
      )
    });
  }

});