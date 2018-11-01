app.controller("rankingsController", function(
  $scope, $routeParams, $location, stockMarketService) {

  if ($routeParams.symbol) {
    $scope.searchSymbol = $routeParams.symbol;
  }

  $scope.goToSymbol = function(symbol) {
    $location.path("/symbols/" + symbol);
  }

  var features = [
    "consistency",
    "growth1Y",
    "growth1M"
  ];

  // wrap logic inside a callback so that page loads only after data is loaded
  loadData.then(
    function(resp) {

      if (ratings.length > 0) {
        console.log("Re-using symbol ratings saved in cache");
      }
      else {

        // initialize feature weights
        var weights = [];
        features.forEach(
          function(feature) {
            weights.push(1.0 / features.length);
          }
        );

        console.log("Calculating ratings for all symbols");
        Object.keys(symbolData).forEach(function(symbol) {

          let chart = symbolData[symbol].chart;
          let trainingData = symbolData[symbol].trainingData;

          if (chart.length >= 2) {
            // rating to be used to evaluate symbol
            let rating = evaluate(chart);
            rating.symbol = symbol;
            ratings.push(rating);
          }
          else {
            console.log("No valid chart found for symbol: ", symbol);
          }
        });

        // normalize values for fields
        console.log("Normalizing fields");
        features.forEach(
          function(feature) {
            normalizeField(ratings, feature);
          }
        );

        // take weighted sum of the different fields to generate overall rating
        ratings.forEach(function(rating) {
          let score = 0;
          for (var i = 0; i < features.length; i++) {
            let feature = features[i];
            score += rating[feature] * weights[i];
          }
          rating.overall = score;
        });

        ratings.sort(function(a, b) {
          return b.overall - a.overall;
        });
        console.log("Evaluated all symbols");
      }

      $scope.ratings = ratings;

    }
  );

  function evaluate(chart) {
    var rating = {};
    features.forEach(function(feature) {
      rating[feature] = evaluateFeature(chart, feature);
    });

    return rating;
  }

  function evaluateFeature(chart, feature) {
    if (feature == "consistency") {
      return evaluateConsistency(chart);
    }
    else if (feature == "growth1Y") {
      return evaluateGrowth1Y(chart);
    }
    else if (feature == "growth1M") {
      return evaluateGrowth1M(chart);
    }
    else {
      console.log("Undefined feature: ", feature);
      return 0;
    }
  }

  function evaluateConsistency(chart) {
    var rating = 1000000;

    var linearRegression = applyLinearRegression(chart);
    var offset = linearRegression.offset;
    var slope = linearRegression.slope;

    for (var i = 0; i < chart.length; i++) {

      // use a simple squared error against a linear fit
      let expectedPrice = offset + i * slope;
      let actualPrice = chart[i].close;

      let diff = getPercentDiff(expectedPrice, actualPrice);
      let squaredError = diff * diff;

      rating -= squaredError;
    }

    if (slope < 0 && rating > 0) {
      rating = slope * rating;
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

  // growth over 1 year
  function evaluateGrowth1Y(chart) {
    var start = chart[0].close;
    var end = chart[chart.length - 1].close;

    return getPercentDiff(start, end);
  }

  // growth over 1 month
  function evaluateGrowth1M(chart) {
    var start = chart[chart.length - 5].close;
    var end = chart[chart.length - 1].close;

    return getPercentDiff(start, end);
  }

  function normalizeField(ratings, fieldName) {

    // sort field in ascending order
    ratings.sort(function(a, b) {
      return a[fieldName] - b[fieldName];
    });

    // offset and scale values to be between 0 and 100
    for (let i = 0; i < ratings.length; i++) {
      let rating = ratings[i];
      rating[fieldName] = i * 1.0 / ratings.length * 100;
    }
  }

  // utility methods
  function getPercentDiff(a, b) {
    return (b * 1.0 / a - 1) * 100;
  }

});




