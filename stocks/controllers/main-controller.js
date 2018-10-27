var pageInfo = {};

app.controller("mainController", function($scope, stockMarketService) {

  $scope.pageInfo = pageInfo;

  $scope.resetCurrentPage = function() {
    pageInfo.currentPage = "Home";
  }

  $scope.sectors = sectors;

});