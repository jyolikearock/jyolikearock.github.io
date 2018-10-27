app.controller("rankingsController", function($scope, stockMarketService) {

  // for coloring nav bar
  pageInfo.currentPage = "Rankings";

  $scope.allSymbols = [];
  $scope.charts = {};

  // kick off the process with the first step
  getAllSymbols();
  // --> get charts for each symbol
  // --> evaluate symbols
  // --> store results

  // get all symbols
  function getAllSymbols() {

    // determine which sectors haven't been queried yet
    var sectorsToGet = [];
    sectors.forEach(function(sector) {
      if (symbolsBySector[sector]) {
        symbolsBySector[sector].forEach(function(symbol) {
          $scope.allSymbols.push({"symbol": symbol});
        });
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
          symbols.forEach(function(symbol) {
            $scope.allSymbols.push({"symbol": symbol});
          });

          // store results in global cache
          symbolsBySector[sector] = symbols.slice();

          callsCompleted++;
          // continue to next step if all sectors have been processed
          if (callsCompleted == sectorsToGet.length) {
            getChartsForSymbols();
            console.log("Got all symbols; proceed to get symbol data");
          }
        }
      )
    });
  }

  // get charts for every symbol
  function getChartsForSymbols() {

    var callsCompleted = 0;
    var symbols = $scope.allSymbols;

    // split symbols into batches of 100
    var batchSize = 100;
    for (var i = 0; i < symbols.length; i++) {
      var batch = [];
      batch.push(symbols[i].symbol);

      // once batch fills up, make the call, then reset batch
      if (batch.length == batchSize || i == symbols.length - 1) {
        var batchCopy = batch.slice();
        stockMarketService.getChartsForSymbols(batchCopy).then(
          function(resp) {

            // pick out each symbol's chart and store it
            batchCopy.forEach(function(symbol) {
              $scope.charts[symbol] = resp[symbol].chart;
            });

            callsCompleted += batchCopy.length;
            // continue to next step if all charts have been gathered
            if (callsCompleted == symbols.length) {
              // TODO
              console.log("Got charts for all symbols: ", symbols.length);
            }
          }
        )

        batch = [];
      }
    }
  }

});





















