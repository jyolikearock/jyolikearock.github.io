// service that manages global values shared across the entire app
app.service("cacheService", function($http, $q, stockMarketService) {

  this.loadDataIfNeeded = function() {
    if (Object.keys(symbolData) == 0) {
      console.log("Loading data from server");
      return getSymbolsForSectors();
    }
    else {
      console.log("Data already loaded");
      return $q.when(true);
    }
  }

  // gets symbols for each market sector
  function getSymbolsForSectors() {
    var promises = [];

    // make a request for each sector
    sectors.forEach(
      function(sector) {
        promises.push(getSymbolsForSector(sector));
      }
    )

    // return a promise that resolves to true when all requests resolve
    return $q.all(promises).then(
      function(resp) {
        return true;
      }
    )
  }

  // gets symbols for a market sector
  function getSymbolsForSector(sector) {
    return stockMarketService.listSymbols(sector).then(
      function(resp) {
        var symbols = [];

        // resp is an array of symbol data - extract just the symbol name
        resp.forEach(
          function(data) {
            symbols.push(data.symbol);
          }
        )
        symbolsBySector[sector] = symbols;
        console.log("Loaded symbols for sector: ", sector);

        return getDataForSymbols(symbols);
      }
    );
  }

  // gets data for a list of symbols
  function getDataForSymbols(symbols) {

    var promises = [];

    // split symbols into batches of 100
    var batch = [];
    var batchSize = 100;
    var numBatches = Math.ceil(symbols.length * 1.0 / batchSize);
    var numBatchesProcessed = 0;

    for (var i = 0; i < symbols.length; i++) {
      batch.push(symbols[i]);

      // if batch is filled up, make request and clear the batch
      if (batch.length == batchSize || i == symbols.length - 1) {
        var promise = stockMarketService.getDataForSymbols(batch.slice()).then(
          function(resp) {

            // resp is map of symbol --> symbol data
            Object.keys(resp).forEach(
              function(symbol) {
                symbolData[symbol] = resp[symbol];
              }
            );

            return true;
          }
        );

        promises.push(promise);
        batch = [];
      }
    }

    // return a promise that resolves to true when all the requests resolve
    return $q.all(promises).then(
      function(resp) {
        return true;
      }
    );
  }

});