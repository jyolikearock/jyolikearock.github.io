// shared across the entire application
var pageInfo = {};
var sectors = [
  "Communication Services",
  "Consumer Discretionary",
  "Consumer Staples",
  "Energy",
  "Financials",
  "Health Care",
  "Industrials",
  "Materials",
  "Real Estate",
  "Utilities",
  "Technology"
];
var symbolData = {};
var symbolsBySector = {};
var symbolDataCache = {};
var symbolChartCache = {};

app.controller("mainController", function($scope, stockMarketService) {

  $scope.pageInfo = pageInfo;
  $scope.sectors = sectors;

  $scope.resetCurrentPage = function() {
    pageInfo.currentPage = "Home";
  }

  $scope.isLoadingFinished = false;

  getSymbolsForSectors();

  // get symbols for each market sector
  function getSymbolsForSectors() {
    var numSectorsProcessed = 0;
    sectors.forEach(function(sector) {
      console.log("Getting symbols for sector: ", sector);
      stockMarketService.listSymbols(sector).then(
        function(resp) {
          symbolsBySector[sector] = resp;
          numSectorsProcessed++;
          if (numSectorsProcessed == sectors.length) {
            console.log("Loaded symbols for all sectors");
          }
        }
      )
    });
  }

  function getDataForSymbols() {
    var numSectorsProcessed = 0;

    sectors.forEach(function(sector) {
      var symbols = symbolsBySector[sector];

      // split symbols into batches of 100
      var batch = [];
      var batchSize = 100;
      var numBatches = Math.ceil(symbols.length * 1.0 / batchSize);
      var numBatchesProcessed = 0;

      for (var i = 0; i < symbols.length; i++) {
        batch.push(symbols[i]);

        // if batch is filled up, make request and clear the batch
        if (batch.length == batchSize || i = symbols.length + 1) {
          stockMarketService.getDataForSymbols(batch.slice()).then(
            function(resp) {

              // resp is map of symbol --> symbol data
              Object.keys(resp).forEach(
                function(symbol) {
                  symbolData[symbol] = resp[symbol];
                }
              )
              numBatchesProcessed++;

              if (numBatchesProcessed == numBatches) {
                console.log("Loaded data for all symbols in sector: ", sector);
                numSectorsProcessed++;

                if (numSectorsProcessed == sectors.length) {
                  console.log("Loaded data for all symbols in all sectors");
                  $scope.isLoadingFinished = true;
                }
              }
            }
          )

          batch = [];
        }
      }
    });
  }

});