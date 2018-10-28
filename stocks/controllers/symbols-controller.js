app.controller("symbolsController", function($scope, $routeParams) {

  $scope.symbol = $routeParams.symbol;

  // for coloring nav bar
  pageInfo.currentPage = "Symbols";

  if ($scope.symbol) {

    $scope.symbol = $scope.symbol.toUpperCase();
    var symbol = $scope.symbol;

    // load symbol data from cache
    if (symbolData[symbol]) {
      console.log("Loading data in cache for symbol: " + symbol);
      $scope.error = false;

      var symbolData = symbolData[symbol];
      $scope.quote = Object.assign({}, symbolData.quote);
      generateChart(symbolData.chart);
    }

    // if not in cache, display error message
    else {
      console.log("Loading data for symbol: ", symbol);
      $scope.error = "Couldn't find that symbol";
    }
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