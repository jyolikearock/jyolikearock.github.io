var pageInfo = {};

app.controller("mainController", function($scope, stockMarketService) {

  $scope.pageInfo = pageInfo;

  // populate sectors
  console.log("Getting market sectors");
  $scope.sectors = [];

  stockMarketService.listSectors().then(
    function(resp) {
      var sectors = [];
      resp.forEach(function(e) {
        sectors.push(e.name);
      });

      $scope.sectors = sectors;
      console.log("Loaded market sectors: " + $scope.sectors);
    });

});