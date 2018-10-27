app.controller("rankingsController", function($scope, stockMarketService) {

  // for coloring nav bar
  pageInfo.currentPage = "Rankings";

  // array of objects: {symbol, growthRating, consistencyRating, overallRating}
  $scope.allSymbols = [];

  // map of symbol --> chart (array)
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
        symbolsBySector[sector].forEach(function(e) {
          $scope.allSymbols.push({"symbol": e.symbol});
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
            var symbol = {};
            symbol.symbol       = e.symbol;
            symbol.companyName  = e.companyName;
            symbol.price        = e.close;
            symbol.change       = e.changePercent * 100;

            symbols.push(symbol);
          });
          console.log("Got symbols for sector: " + sector);

          // append to list of all symbols
          symbols.forEach(function(e) {
            $scope.allSymbols.push({"symbol": e.symbol});
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
    var batch = [];
    var batchSize = 100;
    for (var i = 0; i < symbols.length; i++) {
      batch.push(symbols[i].symbol);

      // once batch fills up, make the call, then reset batch
      if (batch.length == batchSize || i == symbols.length - 1) {
        stockMarketService.getChartsForSymbols(batch.slice()).then(
          function(resp) {

            // pick out each symbol's chart and store it
            Object.keys(resp).forEach(function(symbol) {
              $scope.charts[symbol] = resp[symbol].chart;
              callsCompleted++;
            });

            console.log(callsCompleted + " of " + symbols.length + " charts gathered");
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





















