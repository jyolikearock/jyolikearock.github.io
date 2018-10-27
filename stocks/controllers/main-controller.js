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

  $scope.isLoading = true;

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
            // TODO
          }
        }
      )
    });
  }

});