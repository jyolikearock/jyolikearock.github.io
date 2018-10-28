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

        normalize(ratings);

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

    return rating;
  }

  function evaluateConsistency(chart) {
    var rating = 0;

    var linearRegression = applyLinearRegression(chart);
    var slope = linearRegression.slope;
    var offset = linearRegression.offset;

    for (var i = 0; i < chart.length; i++) {

      // use a simple squared error against a linear fit
      let expectedPrice = offset + i * slope;
      let actualPrice = chart[i].close;

      let diff = getPercentDiff(expectedPrice, actualPrice);
      let squaredError = diff * diff;

      // if diff is 0, consistency goes up by 100 points (arbitrary)
      // if diff is greater than 10%, consistency goes down
      rating += (100 - squaredError);
    }

    return rating;
  }

  function applyLinearRegression(chart) {
    var sumX = 0;
    var sumY = 0;
    var sumXX = 0;
    var sumXY = 0;
    var count = chart.length

    for (var i = 0; i < count; i++) {
      let x = i;
      let y = chart[i].close;
      sumX += x;
      sumY += y;
      sumXX += x * x;
      sumXY += x * y;
    }

    var slope = (count * sumXY - sumX * sumY) / (count * sumXX - sumX * sumX);
    var offset = (sumY - slope * sumX) / count;

    return {"slope": slope, "offset": offset};
  }

  function evaluateGrowth(chart) {
    var start = chart[0].close;
    var end = chart[chart.length - 1].close;

    return getPercentDiff(start, end);
  }

  function normalize(ratings) {

    // normalize consistency
    normalizeField(ratings, "consistency");

    // normalize growth
    normalizeField(ratings, "growth");

    // average the two to compute overall rating
    ratings.forEach(function(rating) {
      rating.overall = (rating.consistency + rating.growth) / 2;
    });
  }

  function normalizeField(ratings, fieldName) {

    // sort field in ascending order
    ratings.sort(function(a, b) {
      return a[fieldName] - b[fieldName];
    });

    // assign percentiles to values
    for (let i = 0; i < ratings.length; i++) {
      let rating = ratings[i];
      rating[fieldName] = (i * 1.0 / ratings.length) * 100;
    }
  }

  function getPercentDiff(a, b) {
    return (b * 1.0 / a - 1) * 100;
  }

});





















