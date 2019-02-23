app.controller("rankingsController", function(
  $scope, $routeParams, $location, evaluator) {

  if ($routeParams.symbol) {
    $scope.searchSymbol = $routeParams.symbol;
  }

  $scope.goToSymbol = function(symbol) {
    $location.path("/symbols/" + symbol);
  }

  $scope.showDetails = function(symbol) {
    $scope.displayedSymbol = $scope.ratings.find(rating => {
      return rating.symbol = symbol;
    });
    generateChart($scope.displayedSymbol.chart);
    $scope.showDetails = true;
  }

  $scope.hideDetails = function() {
    $scope.showDetails = false;
  }

  // wrap logic inside a callback so that page loads only after data is loaded
  loadData.then(
    function(resp) {
      $scope.ratings = evaluator.evaluate(symbolData, 0, 0);
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




