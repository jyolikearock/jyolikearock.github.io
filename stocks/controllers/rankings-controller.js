var currentRatings = [];

app.controller("rankingsController", function(
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
      if (currentRatings.length > 0) {
        console.log("Re-using cached ratings");
      }
      else {
        console.log("Evaluating symbols for this year");
        currentRatings = evaluator.evaluate(symbolData, 0, 0);
      }
      $scope.ratings = currentRatings;
    }
  );
});




