var sectors = [
  "Communication Services",
  "Consumer Discretionary",
  "Consumer Staples",
  "Energy",
  "Financials",
  "Health Care",
  "Industrials",
  "Materials",
  "Real Estate",
  "Utilities",
  "Technology"
];

// map of sector --> symbolData
var symbolsBySector = {};

// array of all symbols
var allSymbols = [];

// map of symbol --> {quote, chart}
var symbolData = {};

// a promise that resolves when all server data has been loaded
var loadData = undefined;

app.controller("mainController", function($scope, cacheService) {

  $scope.sectors = sectors;
  $scope.isNavCollapsed = true;
  $scope.toggleNav = function() {
    $scope.isNavCollapsed = !$scope.isNavCollapsed;
    console.log("toggling nav, collapse: ", $scope.isNavCollapsed);
  }

  $scope.closeNav = function() {
    if (!$scope.isNavCollapsed) {
      $scope.isNavCollapsed = true;
      console.log("closing nav, collapse: ", $scope.isNavCollapsed);
    }
  }

  $scope.isLoadingFinished = false;
  $scope.loadProgress = cacheService.getLoadProgress();

  // load data
  loadData = cacheService.loadDataIfNeeded().then(
    function(resp) {
      if (resp) {
        console.log("Finished loading data");
        $scope.isLoadingFinished = true;
        return true;
      }
    }
  )

});