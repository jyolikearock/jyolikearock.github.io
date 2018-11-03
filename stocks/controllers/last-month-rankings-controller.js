var lastMonthRatings = [];

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
      if (lastMonthRatings.length > 0) {
        console.log("Re-using cached ratings for last month");
      }
      else {
        console.log("Evaluating symbols up until last month");
        lastMonthRatings = evaluator.evaluate(symbolData, 0, 7);
      }

      $scope.ratings = lastMonthRatings;
    }
  );
});




