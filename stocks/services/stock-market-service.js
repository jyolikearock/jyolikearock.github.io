app.service("stockMarketService", function($http) {

  var baseEndpoint = "https://api.iextrading.com/1.0/stock/";
  var listSectorsUrl = baseEndpoint + "market/sector-performance";

  // utility methods
  this.successCallBack = function(resp) {
    console.log("Got response from server: ", resp);
    return resp;
  }

  this.errorCallBack = function(error) {
    console.log("Got error from server: ", error);
    return error;
  }

  this.httpGet = function(url) {
    $http.get(url).then(successCallBack, errorCallBack);
  }

  // stock market api
  this.listSectors = function() {
    httpGet(listSectorsUrl).then(
      function(resp) {
        console.log("Got response from listSectors call: ", resp);
      },
      function(error) {
        console.log("Got error from listSectors call: ", error);
      });
  }
});