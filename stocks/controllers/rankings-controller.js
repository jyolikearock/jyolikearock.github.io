app.controller("rankingsController", function(
  $scope, $routeParams, $location, evaluator, stockMarketService) {

  if ($routeParams.symbol) {
    $scope.searchSymbol = $routeParams.symbol;
  }

  $scope.goToSymbol = function(symbol) {
    $location.path("/symbols/" + symbol);
  }

  $scope.showDetailsForSymbol = function(symbol) {

    if ($scope.displayedSymbol &&
        $scope.displayedSymbol.symbol === symbol) {
      $scope.showDetails = false;
      $scope.displayedSymbol = {};
      return;
    }

    $scope.displayedSymbol = $scope.ratings.find(rating => {
      return rating.symbol === symbol;
    });
    generateChart($scope.displayedSymbol.chart);
    stockMarketService.getTheStreetRating(symbol).then(
      function(resp) {
        $scope.showDetails = true;
      }
    );
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




