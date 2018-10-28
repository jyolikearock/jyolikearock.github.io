app.controller("rankingsController", function($scope, stockMarketService) {

  // for coloring nav bar
  pageInfo.currentPage = "Rankings";

  // wrap logic inside a callback so that page loads only after data is loaded
  loadData.then(
    function(resp) {

      // array of objects: {symbol, consistency, growth, overall}
      var ratings = [];

      Object.keys(symbolData).forEach(function(symbol) {
        let chart = symbolData[symbol].chart;
        ratings.push(evaluate(symbol, chart));
      });

      console.log("Evaluated all symbols");
      $scope.ratings = ratings;

    }
  );

  function evaluate(symbol, chart) {
    var rating = {};
    rating.symbol = symbol;
    rating.consistency = evaluateConsistency(chart);
    rating.growth = evaluateGrowth(chart);
    rating.overall = rating.consistency + rating.growth;
  }

  function evaluateConsistency(chart) {
    var rating = 0;

    var previousPrice = -1;
    chart.forEach(
      function(dataPoint) {
        let price = dataPoint.close;
        if (previousPrice < 0) {
          previousPrice = price;
        }
        else {
          if (price > previousPrice) {
            rating++;
          }
        }
      }
    );

    return rating;
  }

  function evaluateGrowth(chart) {
    var start = chart[0];
    var end = chart[chart.length - 1];

    return (end / start - 1) * 100;
  }

});





















