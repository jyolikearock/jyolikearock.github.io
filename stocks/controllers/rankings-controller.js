app.controller("rankingsController", function(
  $scope, $routeParams, $location, stockMarketService) {

  if ($routeParams.symbol) {
    $scope.searchSymbol = $routeParams.symbol;
  }

  $scope.goToSymbol = function(symbol) {
    $location.path("/symbols/" + symbol);
  }

  $scope.togglePreferences = function() {
    $scope.showPreferences = !$scope.showPreferences;
  }

  $scope.savePreferences = function() {
    $scope.togglePreferences();
    computeOverallRatings();
  }

  $scope.setCorrelation = function(featureName, correlation) {
    features.forEach(function(feature) {
      if (feature.name = featureName) {
        console.log("Set correlation to: ", correlation);
        feature.correlation = correlation;
      }
    });
  }

  var features = [
    {
      name: "consistency",
      prettyName: "Consistency",
      correlation: true
    },
    {
      name: "growth1Y",
      prettyName: "1Y Growth",
      correlation: true
    },
    {
      name: "growth1M",
      prettyName: "1M Growth",
      correlation: true
    }
  ];

  $scope.features = features;

  // wrap logic inside a callback so that page loads only after data is loaded
  loadData.then(
    function(resp) {

      if (ratings.length > 0) {
        console.log("Re-using symbol ratings saved in cache");
      }
      else {

        // initialize feature weights
        features.forEach(
          function(feature) {
            feature.weight = 1.0 / features.length;
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
            normalizeFeature(ratings, feature);
          }
        );

        // take weighted sum of the different fields to generate overall rating
        computeOverallRatings();

        ratings.sort(function(a, b) {
          return b.overall - a.overall;
        });
        console.log("Evaluated all symbols");
      }

      $scope.ratings = ratings;

    }
  );

  function computeOverallRatings() {
    console.log("Computing overall ratings for all symbols");
    ratings.forEach(function(rating) {
      var overallRating = 0;
      features.forEach(function(feature) {
        var featureName = feature.name;
        var featureRating = rating[featureName];

        // if feature has a negative correlation, lower is better
        if (!feature.correlation) {
          featureRating = 100 - featureRating;
        }
        overallRating += feature.weight * featureRating;
      });
      rating.overall = overallRating;
    });
  }

  function evaluate(chart) {
    var rating = {};
    features.forEach(function(feature) {
      rating[feature.name] = evaluateFeature(chart, feature);
    });

    return rating;
  }

  function evaluateFeature(chart, feature) {
    var featureName = feature.name;
    if (featureName == "consistency") {
      return evaluateConsistency(chart);
    }
    else if (featureName == "growth1Y") {
      return evaluateGrowth1Y(chart);
    }
    else if (featureName == "growth1M") {
      return evaluateGrowth1M(chart);
    }
    else {
      console.log("Undefined feature: ", featureName);
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
    var start = chart[chart.length - 7].close;
    var end = chart[chart.length - 1].close;

    return getPercentDiff(start, end);
  }

  function normalizeFeature(ratings, feature) {

    var featureName = feature.name;

    // sort field in ascending order
    ratings.sort(function(a, b) {
      return a[featureName] - b[featureName];
    });

    // offset and scale values to be between 0 and 100
    for (let i = 0; i < ratings.length; i++) {
      let rating = ratings[i];
      rating[featureName] = i * 1.0 / ratings.length * 100;
    }
  }

  // utility methods
  function getPercentDiff(a, b) {
    return (b * 1.0 / a - 1) * 100;
  }

});




