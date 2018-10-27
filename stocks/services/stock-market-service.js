app.service("stockMarketService", function($http, $q) {

  var baseEndpoint = "https://api.iextrading.com/1.0/stock/";
  var listSectorsUrl = baseEndpoint + "market/sector-performance";
  var listSymbolsUrl = baseEndpoint + "market/collection/sector?collectionName=";
  var getSymbolUrl = baseEndpoint + "market/batch?types=quote,chart&range=1y&chartInterval=5&symbols=";

  // stock market api
  // list sectors
  this.listSectors = function() {
    var response = httpGet(listSectorsUrl).then(
      function(resp) {
        console.log("Got response from listSectors call: ", resp);
        return resp;
      });

    return $q.when(response);
  };

  // list symbols for sector
  this.listSymbols = function(sector) {
    var response = httpGet(listSymbolsUrl + sector).then(
      function(resp) {
        console.log("Got response from listSymbols call: ", resp);
        return resp;
      });

    return $q.when(response);
  }

  // get data for a symbol
  this.getDataForSymbol = function(symbol) {

    var response = httpGet(getSymbolUrl + symbol).then(
      function(resp) {
        console.log("Got response from getDataForSymbol call: ", resp);
        return resp;
      }
    );

    return $q.when(response);
  }

  // get data for up to 100 symbols
  this.getDataForSymbols = function(symbols) {

    // convert input from array to comma-delimited string
    var symbolsAsString = "";
    var delimiter = "";
    symbols.forEach(function(e) {
      symbolsAsString += delimiter + e;
      delimiter = ",";
    });

    var response = httpGet(getSymbolUrl + symbolsAsString).then(
      function(resp) {
        console.log("Got response from getDataForSymbols call: ", resp);
        return resp;
      }
    );

    return $q.when(response);
  }

  // utility methods
  function httpGet(url) {
    var response = $http.get(url).then(successCallBack, errorCallBack);
    return $q.when(response);
  }

  function successCallBack(resp) {
    return resp.data;
  }

  function errorCallBack(error) {
    console.log("Got error from call: ", resp);
    return error;
  }

});