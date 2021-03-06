var lastViewedSector = "";

app.controller("sectorsController",
  function($scope, $routeParams, $location, stockMarketService) {

    if ($routeParams.sector) {
      $scope.sector = $routeParams.sector;
      lastViewedSector = $routeParams.sector;
    }
    else if (lastViewedSector) {
      $scope.sector = lastViewedSector;
    }

    $scope.goToSymbol = function(symbol) {
      $location.path("/symbols/" + symbol);
    }

    // wrap logic inside a callback so that page loads only after data is loaded
    loadData.then(
      function(resp) {
        if ($scope.sector) {

          // if symbols for this sector was previously loaded, just re-use that data
          if (symbolsBySector[$scope.sector]) {
            console.log("Re-using symbols from cache for sector: " + $scope.sector);
            $scope.symbols = symbolsBySector[$scope.sector].slice();
          }

          // otherwise, call the service
          else {
            console.log("Listing symbols for sector: " + $scope.sector);
            listSymbols($scope.sector);
          }
        }
      }
    );

    function listSymbols(sector) {
      stockMarketService.listSymbols(sector).then(
        function(resp) {
          var symbols = resp;
          symbols.forEach(function(symbol) {
            symbol.changePercent  = symbol.changePercent * 100;
          });

          $scope.symbols = symbols;
          console.log("Got symbols for sector: " + sector);

          // store results in global cache
          symbolsBySector[$scope.sector] = symbols.slice();
        });
    }
  }
);