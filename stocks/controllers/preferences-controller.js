app.controller("preferencesController", function(
  $scope, evaluator) {

    $scope.features = features;
    $scope.preferences = preferences;

    $scope.setCorrelation = function(featureName, correlation) {
      features.forEach(function(feature) {
        if (feature.name == featureName) {
          console.log("Setting correlation: ", correlation, " for feature: ", featureName);
          feature.correlation = correlation;
        }
      });
      preferencesUpdated = true;
    }

    $scope.setAggregation = function(aggregation) {
      console.log("Setting aggregation method to: ", aggregation);
      preferences.aggregation = aggregation;
      preferencesUpdated = true;
    }
});




