'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').
  service('Facebook', function($http) {    

    var url = 'https://graph.facebook.com/';

    return {
      getPosts: function(access_token, query) {
        var request = $http.get(url + 'me/' + query + '?access_token='+access_token).then(
          function(response) {
            return response;
          },
          function(err) {
            return err;
          }
        ); 

        return request;
      },
      getEvents: function(access_token, query) {
        var request = $http.get(url + 'me/' + query + '?access_token='+access_token).then(
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
