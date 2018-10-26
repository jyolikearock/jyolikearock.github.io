app.controller("mainController", function($scope, stockMarketService) {

  // populate sectors
  console.log("Getting market sectors");
  $scope.sectors = stockMarketService.listSectors();

});