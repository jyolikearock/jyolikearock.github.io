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
    var rating = 1000;

    var previousPrice = undefined;
    var previousGrowth = undefined;
    chart.forEach(
      function(dataPoint) {
        let price = dataPoint.close;
        if (previousPrice === undefined) {
          previousPrice = price;
          return;
        }

        let growth = getPercentDiff(previousPrice, price);
        if (previousGrowth === undefined) {
          previousGrowth = growth;
          return;
        }

        let diffInGrowth = Math.abs(growth - previousGrowth);
        rating = rating - diffInGrowth;

        previousPrice = price;
        previousGrowth = growth;
      }
    );

    return rating;
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
    let numBuckets = 99;

    let dataPointsPerBucket = ratings.length / numBuckets;
    for (let p = 0; p <= numBuckets; p++) {
      for (let i = 0; i < dataPointsPerBucket; i++) {
        let index = p * dataPointsPerBucket + i;
        if (index >= ratings.length) {
          break;
        }
        ratings[index][fieldName] = (p + 1);
      }
    }
  }

  function getPercentDiff(a, b) {
    return (b * 1.0 / a - 1) * 100;
  }

});





















