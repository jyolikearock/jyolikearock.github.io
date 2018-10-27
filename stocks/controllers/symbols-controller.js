app.controller("symbolsController", function($scope, $routeParams, stockMarketService) {

  $scope.symbol = $routeParams.symbol;

  // for coloring nav bar
  pageInfo.currentPage = "Symbols";

  if ($scope.symbol) {
    console.log("Loading data for symbol: ", $scope.symbol);
    getDataForSymbol($scope.symbol);
  }

  function getDataForSymbol(symbol) {
    stockMarketService.getDataForSymbol(symbol).then(
      function(resp) {
        respData = resp[symbol];

        // extract key data from quote
        var quote = respData.quote;
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
        respData.chart.forEach(function(e) {
          var dataPoint = {};
          dataPoint.date          = e.date;
          dataPoint.close         = e.close;
          dataPoint.changePercent = e.changePercent;
          symbolData.chart.push(dataPoint);
        });

        $scope.symbolData = symbolData;

        console.log("Extracted key data for symbol: ", symbol);
      }
    );
  }

});