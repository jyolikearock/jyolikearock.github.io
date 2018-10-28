app.controller("symbolsController", function($scope, $routeParams) {

  $scope.symbol = $routeParams.symbol;

  // for coloring nav bar
  pageInfo.currentPage = "Symbols";

  // wrap logic inside a callback so that page loads only after data is loaded
  loadData.then(
    function(resp) {

      // used to populate typeahead dropdown
      $scope.allSymbols = allSymbols;

      if ($scope.symbol) {

        $scope.symbol = $scope.symbol.toUpperCase();
        var symbol = $scope.symbol;

        // load symbol data from cache
        if (symbolData[symbol]) {
          console.log("Loading data in cache for symbol: " + symbol);
          $scope.error = false;

          var data = symbolData[symbol];
          $scope.symbolData = Object.assign({}, data.quote);
          generateChart(data.chart);
        }

        // if not in cache, display error message
        else {
          console.log("Loading data for symbol: ", symbol);
          $scope.error = "Couldn't find that symbol";
        }
      }
    }
  );

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