app.controller("preferencesController", function(
  $scope, evaluator) {

    $scope.features = features;

    $scope.setCorrelation = function(featureName, correlation) {
      features.forEach(function(feature) {
        if (feature.name == featureName) {
          console.log("Setting correlation: ", correlation, " for feature: ", featureName);
          feature.correlation = correlation;
        }
      });
      preferencesUpdated = true;
    }

    $scope.setAggregation = function(_aggregation) {
      console.log("Setting aggregation method to: ", _aggregation);
      aggregation = _aggregation;
      preferencesUpdated = true;
    }
});




