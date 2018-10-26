app.service("stockMarketService", function($http, $q) {

  var baseEndpoint = "https://api.iextrading.com/1.0/stock/";
  var listSectorsUrl = baseEndpoint + "market/sector-performance";

  // stock market api
  this.listSectors = function() {
    httpGet(listSectorsUrl).then(
      function(resp) {
        console.log("Got response from listSectors call: ", resp);
      },
      function(error) {
        console.log("Got error from listSectors call: ", error);
      });
  };

  // utility methods
  function httpGet(url) {
    var response = $http.get(url).then(successCallBack, errorCallBack);
    return $q.when(response);
  }

  function successCallBack(resp) {
    console.log("Got response from server: ", resp);
    return resp;
  }

  function errorCallBack(error) {
    console.log("Got error from server: ", error);
    return error;
  }

});