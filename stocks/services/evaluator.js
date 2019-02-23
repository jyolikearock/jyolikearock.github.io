var features = [
  {
    name: "consistency",
    prettyName: "Consistency",
    correlation: 1
  },
  {
    name: "growth1Y",
    prettyName: "1Y Growth",
    monthStart: 0,
    monthEnd: 12,
    correlation: 1
  },
  {
    name: "growth1M",
    prettyName: "1M Growth",
    monthStart: 11,
    monthEnd: 12,
    correlation: 0
  },
  {
    name: "growthQ1",
    prettyName: "Q1 Growth",
    monthStart: 0,
    monthEnd: 3,
    correlation: 1
  },
  {
    name: "growthQ2",
    prettyName: "Q2 Growth",
    monthStart: 3,
    monthEnd: 6,
    correlation: 1
  },
  {
    name: "growthQ3",
    prettyName: "Q3 Growth",
    monthStart: 6,
    monthEnd: 9,
    correlation: 1
  },
  {
    name: "growthQ4",
    prettyName: "Q4 Growth",
    monthStart: 9,
    monthEnd: 12,
    correlation: 1
  }
];

var preferences = {
  aggregation: "geometric"
}
var ratingsByDateRange = {};

app.service("evaluator", function() {

  var ratings = [];
  var start = 0;
  var end = 0;

  this.clearCache = function() {
    Object.keys(ratingsByDateRange).forEach(function(dateRange) {
      ratingsByDateRange[dateRange] = false;
    });
  }

  // start and end define which points on the chart to evaluate between
  // end is number of points away from the last point on the chart
  // start = 0 and end = 0 results in spanning the whole chart
  this.evaluate = function(symbolData, _start, _end) {

    start = _start;
    end = _end;
    var dateRange = [start, end];
    if (ratingsByDateRange[dateRange]) {
      console.log("Re-using cached ratings for date range: ", dateRange);
      return ratingsByDateRange[dateRange];
    }

    console.log("Evaluating symbols for date range: ", dateRange);
    ratings = [];

    // evaluate individual features
    console.log("Evaluating individual features");
    Object.keys(symbolData).forEach(function(symbol) {
      ratings.push(evaluateSymbol(symbol));
    });

    // normalize features so that they fall within 0-100
    features.forEach(function(feature) {
      normalizeFeature(ratings, feature);
    });

    // evaluate overall rating based on features
    evaluateOverallRatings();

    // cache ratings to re-use next time
    ratingsByDateRange[dateRange] = ratings;

    return ratings;
  }

  function evaluateSymbol(symbol) {

    let chart = symbolData[symbol].chart;
    let quote = symbolData[symbol].quote;
    let rating = {};

    // don't include any symbol that has less than 2 data points
    if (chart.length >= 2) {

      // populate some basic metadata
      rating.symbol         = symbol;
      rating.companyName    = quote.companyName;
      rating.sector         = quote.sector;
      rating.latestPrice    = quote.latestPrice;

      // populate more detailed metadata - won't be displayed on main table
      rating.open             = quote.open;
      rating.close            = quote.close;
      rating.change           = quote.change;
      rating.changePercent    = quote.changePercent;
      rating.changePercent1Y  = evaluateGrowth1Y(chart);
      rating.chart            = chart;

      // evaluate this symbol against each feature
      features.forEach(function(feature) {
        rating[feature.name] = evaluateFeature(chart, feature);
      });

      // if evaluation is not over the full range,
      // also evaluate actual growth from end to current
      if (end > 0) {
        rating.actual = evaluateActualGrowth(chart);
      }
    }
    else {
      console.log("No valid chart found for symbol: ", symbol);
    }

    return rating;
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

  function evaluateOverallRatings() {
    console.log("Evaluating overall ratings");
    var aggregation = preferences.aggregation;
    ratings.forEach(function(rating) {

      // initialize overall rating
      var overallRating = 0;
      if (aggregation == 'geometric') {
        overallRating = 1;
      }

      var numFeaturesUsed = 0;
      features.forEach(function(feature) {
        var correlation = feature.correlation;
        if (correlation == 0) {
          return;
        }

        var featureName = feature.name;
        var featureRating = rating[featureName];

        // if feature has a negative correlation, lower is better
        if (correlation < 0) {
          featureRating = 100 - featureRating;
        }

        if (aggregation == 'arithmetic') {
          overallRating += featureRating;
        }
        else if (aggregation == 'geometric') {
          overallRating *= featureRating;
        }
        numFeaturesUsed++;
      });
      if (aggregation == 'arithmetic') {
        overallRating = overallRating / numFeaturesUsed;
      }
      else if (aggregation == 'geometric') {
        overallRating = Math.pow(overallRating, 1.0 / numFeaturesUsed);
      }
      rating.overall = overallRating;
    });

    // sort by overall
    ratings.sort(function(a, b) {
      return b.overall - a.overall;
    });
  }

  function evaluateActualGrowth(chart) {
    var startPrice = chart[chart.length - 1 - end].close;
    var endPrice = chart[chart.length - 1].close;
    return getPercentDiff(startPrice, endPrice);
  }

  function evaluateFeature(chart, feature) {
    var featureName = feature.name;
    if (featureName == "consistency") {
      return evaluateConsistency(chart);
    }
    else if (featureName.includes("growth")) {
      return evaluateGrowth(chart, feature.monthStart, feature.monthEnd);
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

    for (var i = start; i < chart.length - end; i++) {

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
    var count = 0;

    for (var i = start; i < chart.length - end; i++) {
      let x = i;
      let y = chart[i].close;
      sumX += x;
      sumY += y;
      sumXX += x * x;
      sumXY += x * y;
      count++;
    }

    var slope = (count * sumXY - sumX * sumY) / (count * sumXX - sumX * sumX);
    var offset = (sumY - slope * sumX) / count;

    return {"slope": slope, "offset": offset};
  }

  function evaluateGrowth(chart, monthStart, monthEnd) {
    let length = chart.length - end;

    let startIndex = Math.floor(monthStart / 12.0 * length);
    let endIndex = Math.floor(monthEnd / 12.0 * length);

    let startPrice = chart[startIndex].close;
    let endPrice = chart[endIndex].close;

    return getPercentDiff(startPrice, endPrice);
  }

  // growth over 1 year
  function evaluateGrowth1Y(chart) {
    var startPrice = chart[start].close;
    var endPrice = chart[chart.length - 1 - end].close;

    return getPercentDiff(startPrice, endPrice);
  }

  // growth over 1 month
  function evaluateGrowth1M(chart) {
    var startPrice = chart[chart.length - 7 - end].close;
    var endPrice = chart[chart.length - 1 - end].close;

    return getPercentDiff(startPrice, endPrice);
  }

  // utility methods
  function getPercentDiff(a, b) {
    return (b * 1.0 / a - 1) * 100;
  }
});