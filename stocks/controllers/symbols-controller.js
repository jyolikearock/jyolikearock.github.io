app.controller("symbolsController", function($scope, $routeParams, stockMarketService) {

  $scope.symbol = $routeParams.symbol;

  // for coloring nav bar
  pageInfo.currentPage = "Symbols";

  if ($scope.symbol) {

    $scope.symbol = $scope.symbol.toUpperCase();
    var symbol = $scope.symbol;

    // check cache first
    if (symbolDataCache[symbol] && symbolChartCache[symbol]) {
      $scope.symbolData = Object.assign({}, symbolDataCache[symbol]);
      generateChart(symbolChartCache[symbol]);
    }

    // if not in cache, call the service
    else {
      console.log("Loading data for symbol: ", symbol);
      getDataForSymbol(symbol);
    }
  }

  function getDataForSymbol(symbol) {

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
          symbolChart = [];
          resp.chart.forEach(function(e) {
            var dataPoint = {};
            dataPoint.date  = e.date;
            dataPoint.close = e.close;
            symbolChart.push(dataPoint);
          });

          generateChart(symbolChart);
          $scope.symbolData = symbolData;
          $scope.error = false;

          // cache data
          symbolDataCache[symbol] = Object.assign({}, symbolData);
          symbolChartCache[symbol] = symbolChart.slice();

          console.log("Extracted key data for symbol: ", symbol);
        }

        // no data for that symbol found
        else {
          $scope.symbolData = false;
          $scope.error = "Couldn't find that stock symbol";
        }

        $scope.buttonDisabled = false;
      }
    );
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