var pageInfo = {};
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
var symbolsBySector = {};
var allSymbols = [];
var symbolData = {};

app.controller("mainController", function($scope, cacheService) {

  $scope.pageInfo = pageInfo;
  $scope.sectors = sectors;

  $scope.resetCurrentPage = function() {
    pageInfo.currentPage = "Home";
  }

  $scope.isLoadingFinished = false;

  // load data
  cacheService.loadDataIfNeeded().then(
    function(resp) {
      if (resp) {
        $scope.isLoadingFinished = true;
      }
    }
  )

});