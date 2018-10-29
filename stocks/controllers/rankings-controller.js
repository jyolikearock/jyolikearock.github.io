app.controller("rankingsController", function($scope, $location, stockMarketService) {

  // for coloring nav bar
  pageInfo.currentPage = "Rankings";

  $scope.goToSymbol = function(symbol) {
    $location.path("/symbols/" + symbol);
  }

  var features = [
    "consistency",
    "historicalGrowth",
    "recentGrowth"
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

        var trainingDataRatings = [];

        console.log("Calculating ratings for all symbols");
        Object.keys(symbolData).forEach(function(symbol) {

          let chart = symbolData[symbol].chart;
          let trainingData = symbolData[symbol].trainingData;

          if (chart.length >= 2) {
            // rating to be used to evaluate symbol
            let rating = evaluate(chart);
            rating.symbol = symbol;
            ratings.push(rating);

            // rating from 2y ago used to train algorithm
            if (trainingData.length >= 2) {
              let trainingDataRating = evaluate(trainingData);
              trainingDataRating.actualGrowth = getPercentDiff(
                  chart[0].close,
                  chart[chart.length - 1].close);
              trainingDataRatings.push(trainingDataRating);
            }
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
            normalizeField(trainingDataRatings, feature);
          }
        );
        normalizeField(trainingDataRatings, "actualGrowth");

        console.log("Computing weighted sums for training data");
        computeWeightedSums(trainingDataRatings, weights);
        normalizeField(trainingDataRatings, "computedGrowth");

        // process training data to adjust feature weights
        console.log("Adjusting weights based on training data");
        processTrainingData(trainingDataRatings, weights);

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

  // dot product weights x features
  function computeWeightedSums(trainingDataRatings, weights) {
    for (var i = 0; i < trainingDataRatings.length; i++) {
      let rating = trainingDataRatings[i];
      let weighted = [];
      for (var j = 0; j < features.length; j++) {
        let feature = features[i];
        let featureValue = rating[feature];
        let weight = weights[i];
        weighted[i] = weight * featureValue;
      }

      let computedGrowth = sumArray(weighted);
      rating.weighted = weighted;
      rating.computedGrowth = computedGrowth;
    }
  }

  // adjust weights based on how much the computed growth differs from the actual
  function processTrainingData(trainingDataRatings, weights) {
    trainingDataRatings.forEach(function(rating) {
      let diff = rating.computedGrowth - rating.actualGrowth;
      let wFeatures = normalize(rating.weighted);

      for (let i = 0; i < weights.length; i++) {
        // if computed growth is higher than the actual,
        // decrease the weights proportionally to the magnitude of the features
        if (diff > 0) {
          weights[i] = Math.max(0, weights[i] - wFeatures[i] * (diff / 1000));
        }
        // if computed growth is lower than the actual, increase the weights
        else if (diff < 0) {
          weights[i] = weights[i] + wFeatures[i] * (diff / 1000);
        }

        normalize(weights);
      }
    });

    console.log("Finished processing training data; weights: ", weights);
  }

  function evaluate(chart) {
    var rating = {};
    rating.consistency = evaluateConsistency(chart);
    rating.historicalGrowth = evaluateHistoricalGrowth(chart);
    rating.recentGrowth = evaluateRecentGrowth(chart);

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

  // growth over 1 year
  function evaluateHistoricalGrowth(chart) {
    var start = chart[0].close;
    var end = chart[chart.length - 1].close;

    return getPercentDiff(start, end);
  }

  var oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // growth over 1 month
  function evaluateRecentGrowth(chart) {
    var start = -1;
    for (var i = chart.length - 1; i >= 0; i--) {
      if (Date.parse(chart[i].date) <= oneMonthAgo) {
        start = chart[i].close;
        break;
      }
    }
    var end = chart[chart.length - 1].close;

    return getPercentDiff(start, end);
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

  // utility methods
  function getPercentDiff(a, b) {
    return (b * 1.0 / a - 1) * 100;
  }

  function normalize(array) {
    var sum = sumArray(array);

    for (var i = 0; i < array.length; i++) {
      array[i] = array[i] / sum;
    }

    return array;
  }

  function sumArray(array) {
    return array.reduce(function(total, e) {
      return total + e;
    });
  }

});





















