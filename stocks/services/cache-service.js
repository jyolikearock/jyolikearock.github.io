// service that manages global values shared across the entire app
app.service("cacheService", function($http, $q, stockMarketService) {

  var loadProgress = {};
  loadProgress.numSymbolsLoaded = 0;

  this.getLoadProgress = function() {
    return loadProgress;
  }

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
        resp.forEach(function(symbolData) {
          convertDeltaToPercentage(symbolData);
        });
        symbolsBySector[sector] = resp;
        console.log("Loaded symbols for sector: ", sector);

        return getDataForSymbols(resp);
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
      batch.push(symbols[i].symbol);

      // if batch is filled up, make request and clear the batch
      if (batch.length == batchSize || i == symbols.length - 1) {
        allSymbols = allSymbols.concat(batch);
        var promise = stockMarketService.getDataForSymbols(batch.slice()).then(
          function(resp) {

            // resp is map of symbol --> symbol data
            Object.keys(resp).forEach(
              function(symbol) {
                var data = resp[symbol];
                // if a chart has fewer than 48 data points in the last 2 years,
                // discard it
                if (data.chart.length >= 48) {
                  convertDeltaToPercentage(data.quote);
                  extractTrainingData(data);
                  symbolData[symbol] = data;
                  loadProgress.numSymbolsLoaded++;
                }
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

  function convertDeltaToPercentage(symbolData) {
    symbolData.changePercent = symbolData.changePercent * 100;
  }

  var oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  function extractTrainingData(symbolData) {
    // data from 2y ago to 1y ago is training data
    var trainingData = [];

    // data from 1y ago to now is considered live data
    var chart = [];
    symbolData.chart.forEach(
      function(dataPoint) {
        if (dataPoint.date < oneYearAgo) {
          trainingData.push(dataPoint);
        }
        else {
          chart.push(dataPoint);
        }
      }
    );

    symbolData.trainingData = trainingData;
    symbolData.chart = chart;
  }

});