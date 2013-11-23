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
  }).
  factory('$FB', function($rootScope) {
 
    var fbLoaded = false;
 
    // Our own customisations
    var _fb =  {
      loaded: fbLoaded,
      isLoaded : function(){
        return this.loaded;
      },
      authenticated : false,
      isAuthenticated : function(){
        console.log('estamos autenticados? ' + this.authenticated);
        return this.authenticated;
      },
      _init: function(params) {

        console.log('iniciando api');

        self = this;

        this.loaded = true;

        // FIXME: Ugly hack to maintain both window.FB
        // and our AngularJS-wrapped $FB with our customisations
        angular.extend(FB, this);
        angular.extend(this, FB);

        // Inicianlizando SDK
        FB.init(params);

        // Autenticando app
        FB.login(function(response) {
          console.log('autenticando...');
          if (response.authResponse) {
            self.authenticated = true;
            FB.api('/me', function(response) {
              console.log('Good to see you, ' + response.name + '.');
            });
          } else {
           console.log('User cancelled login or did not fully authorize.');
          }
         });

        // Obtendo status do usuário atual
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            self.authenticated = true;

            console.log('usuario logado!');
          } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated your app
            console.log('logado no facebook, porém sem autenticação do app');
          } else {
            // the user isn't logged in to Facebook.
            console.log('sem login no facebook');
          }
        });

        if(!$rootScope.$$phase) {
          $rootScope.$apply();
        }
      }
    }

    return _fb;
  });
