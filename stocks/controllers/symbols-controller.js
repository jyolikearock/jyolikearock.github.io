app.controller("symbolsController", function($scope, $routeParams, stockMarketService) {

  $scope.symbol = $routeParams.symbol;

  // for coloring nav bar
  pageInfo.currentPage = "Symbols";

  this.getDataForSymbol = function(symbol) {

    $scope.buttonDisabled = true;

    stockMarketService.getDataForSymbol(symbol).then(
      function(resp) {
        if (resp) {
          // extract key data from quote
          var quote = resp.quote;
          var symbolData = {};
          symbolData.companyName      = quote.companyName;
          symbolData.primaryExchange  = quote.primaryExchange;
          symbolData.sector           = quote.sector;
          symbolData.open             = quote.open;
          symbolData.close            = quote.close;
          symbolData.high             = quote.high;
          symbolData.low              = quote.low;
          symbolData.change           = quote.change;
          symbolData.changePercent    = quote.changePercent * 100;

          // extract prices from chart
          symbolData.chart = [];
          resp.chart.forEach(function(e) {
            var dataPoint = {};
            dataPoint.date          = e.date;
            dataPoint.close         = e.close;
            symbolData.chart.push(dataPoint);
          });

          generateChart(symbolData.chart);
          $scope.symbolData = symbolData;

          console.log("Extracted key data for symbol: ", symbol);
        }

        // no data for that symbol found
        else {
          $scope.error = "Could not find stock symbol " + $scope.symbol;
        }

        $scope.buttonDisabled = false;
      }
    );
  }

  if ($scope.symbol) {
    console.log("Loading data for symbol: ", $scope.symbol);
    getDataForSymbol($scope.symbol);
  }

  function generateChart(chart) {
    var dates = [];
    var prices = [];
    chart.forEach(function(e) {
      dates.push(e.date);
      prices.push(e.close);
    });
    $scope.dates = dates;
    $scope.prices = prices;
  }

});