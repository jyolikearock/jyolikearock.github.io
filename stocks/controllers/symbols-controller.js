app.controller("symbolsController", function($scope, $routeParams, stockMarketService) {

  $scope.symbol = $routeParams.symbol;

  // for coloring nav bar
  pageInfo.currentPage = "Symbols";

  if ($scope.symbol) {

    $scope.symbol = $scope.symbol.toUpperCase();
    var symbol = $scope.symbol;

    // check cache first
    if (symbolData[symbol]) {
      console.log("Re-using data in cache for symbol: " + symbol);
      var symbolData = symbolData[symbol];
      $scope.quote = Object.assign({}, symbolData.quote);
      generateChart(symbolData.chart);
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
          var quote = {};
          quote.companyName      = resp.quote.companyName;
          quote.primaryExchange  = resp.quote.primaryExchange;
          quote.sector           = resp.quote.sector;
          quote.open             = resp.quote.open;
          quote.close            = resp.quote.close;
          quote.high             = resp.quote.high;
          quote.low              = resp.quote.low;
          quote.change           = resp.quote.change;
          quote.changePercent    = resp.quote.changePercent * 100;

          // extract prices from chart
          chart = [];
          resp.chart.forEach(function(e) {
            var dataPoint = {};
            dataPoint.date  = e.date;
            dataPoint.close = e.close;
            chart.push(dataPoint);
          });

          generateChart(chart);
          $scope.quote = quote;
          $scope.error = false;

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