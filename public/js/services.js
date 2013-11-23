'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').
  service('Facebook', function($http) {    

    var url = 'https://graph.facebook.com/';

    return {
      getData: function(access_token, query, sql) {

        if (sql) 
          url = url + sql + '&access_token=' + access_token;
        else
          url = url + 'me/' + query + '?access_token='+access_token;

        console.log('url: ' + url);
        
        var request = $http.get(url).then(
          function(response) {
            return response;
          },
          function(err) {
            return err;
          }
        ); 

        return request;
      }
    }
  });
