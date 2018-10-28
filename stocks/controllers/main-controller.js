app.controller("mainController", function($scope, cacheService) {

  $scope.pageInfo = cacheService.pageInfo;
  $scope.sectors = cacheService.sectors;

  $scope.resetCurrentPage = function() {
    cacheService.pageInfo.currentPage = "Home";
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