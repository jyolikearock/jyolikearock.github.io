app.controller("lastMonthRankingsController", function(
  $scope, $routeParams, $location, evaluator) {

  if ($routeParams.symbol) {
    $scope.searchSymbol = $routeParams.symbol;
  }

  $scope.goToSymbol = function(symbol) {
    $location.path("/symbols/" + symbol);
  }

  // wrap logic inside a callback so that page loads only after data is loaded
  loadData.then(
    function(resp) {
      $scope.ratings = evaluator.evaluate(symbolData, 0, 7);
    }
  );
});




