app.controller("rankingsController", function($scope, stockMarketService) {

  // for coloring nav bar
  pageInfo.currentPage = "Rankings";

  // wrap logic inside a callback so that page loads only after data is loaded
  loadData.then(
    function(resp) {

      if (ratings.length > 0) {
        console.log("Re-using symbol ratings saved in cache");
      }
      else {
        console.log("Calculating ratings for all symbols");
        Object.keys(symbolData).forEach(function(symbol) {
          let chart = symbolData[symbol].chart;
          if (chart.length > 0) {
            ratings.push(evaluate(symbol, chart));
          }
          else {
            console.log("No valid chart found for symbol: ", symbol);
          }
        });
        ratings.sort(function(a, b) {
          return b.overall - a.overall;
        });
        console.log("Evaluated all symbols");
      }

      $scope.ratings = ratings;

    }
  );

  function evaluate(symbol, chart) {
    var rating = {};
    rating.symbol = symbol;
    rating.consistency = evaluateConsistency(chart);
    rating.growth = evaluateGrowth(chart);
    rating.overall = rating.consistency + rating.growth;

    return rating;
  }

  function evaluateConsistency(chart) {
    var rating = 0;

    var previousPrice = -1;
    chart.forEach(
      function(dataPoint) {
        let price = dataPoint.close;
        if (previousPrice >= 0) {
          if (price > previousPrice) {
            rating++;
          }
        }
        previousPrice = price;
      }
    );

    return rating;
  }

  function evaluateGrowth(chart) {
    var start = chart[0].close;
    var end = chart[chart.length - 1].close;

    return (end / start - 1) * 100;
  }

});





















