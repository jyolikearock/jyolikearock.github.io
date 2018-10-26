app.service("stockMarketService", function($http, $q) {

  var baseEndpoint = "https://api.iextrading.com/1.0/stock/";
  var listSectorsUrl = baseEndpoint + "market/sector-performance";
  var listSymbolsUrl = baseEndpoint + "market/collection/sector?collectionName=";

  // stock market api
  // list sectors
  this.listSectors = function() {
    var response = httpGet(listSectorsUrl).then(
      function(resp) {
        console.log("Got response from listSectors call: ", resp);
        var sectors = [];
        resp.data.forEach(function(e) {
          sectors.push(e.name);
        });

        return sectors;
      });

    return $q.when(response);
  };

  // list symbols for sector
  this.getSymbols = function(sector) {
    var response = httpGet(listSymbolsUrl + sector).then(
      function(resp) {
        console.log("Got response from listSymbols call: ", resp);
        var symbols = [];
        resp.data.forEach(function(e) {
          var symbol = {};
          symbol.symbol = e.symbol;
          symbol.companyName = e.companyName;
          symbol.price = e.close;
          symbol.change = e.changePercent * 100;

          symbols.push(symbol);
        });

        return symbols;
      });

    return $q.when(response);
  }

  // utility methods
  function httpGet(url) {
    var response = $http.get(url).then(successCallBack, errorCallBack);
    return $q.when(response);
  }

  function successCallBack(resp) {
    return resp;
  }

  function errorCallBack(error) {
    console.log("Got error from call: ", resp);
    return error;
  }

});