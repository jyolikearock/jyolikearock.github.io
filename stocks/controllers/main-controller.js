app.controller("mainController", function($scope, stockMarketService) {

  // populate sectors
  console.log("Getting market sectors");
  stockMarketService.listSectors();
}]);