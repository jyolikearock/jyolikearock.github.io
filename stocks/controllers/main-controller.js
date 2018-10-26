app.controller("mainController", function($scope, stockMarketService) {

  // populate sectors
  console.log("Getting market sectors");
  $scope.sectors = ["Technology"];

  stockMarketService.listSectors().then(
    function(resp) {
      $scope.sectors = resp;
      console.log("Loaded market sectors: " + $scope.sectors);
    });

});