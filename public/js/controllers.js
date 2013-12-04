'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  }).
  controller('BeerController', function ($scope, $http, $routeParams) {
    
    $scope.msg = 'Cervejas';
    $scope.form = {};
    $scope.cervejas = [];

    var id = $routeParams.id;
    var url = '/api/beers';

    if(id){
      url += '/'+id;

      $http({
        method: 'GET',
        url: url
      }).
      success(function (data, status, headers, config) {
        $scope.cerveja = data;
        $scope.msg = 'Cerveja: '+data.name
      }).
      error(function (data, status, headers, config) {
        $scope.msg = 'Error!'
      });
    }

    $scope.criar = function(){
      var dados = $scope.form;

      $http({
        method: 'POST',
        url: url,
        data: dados
      }).
      success(function (data, status, headers, config) {
        $scope.cerveja = data;
        $scope.cervejas.push(data)
        $scope.msg = 'Cerveja: '+data.name
      }).
      error(function (data, status, headers, config) {
        $scope.msg = 'Error!'
      });
    }

    $scope.deletar = function(){
      console.log('del');
      $http({
        method: 'DELETE',
        url: url
      }).
      success(function (data, status, headers, config) {
        $scope.msg = 'Cerveja deletada'
      }).
      error(function (data, status, headers, config) {
        $scope.msg = 'Error!'
      });

    }

    $scope.salvar= function(){
      var dados = $scope.cerveja;

      delete dados['_id'];
      $http({
        method: 'PUT',
        url: url,
        data: dados
      }).
      success(function (data, status, headers, config) {
        // $scope.cervejas = data;
        $scope.msg = 'Cerveja Atualizada'

        // Buscar a info da nova cerveja
        $http({
          method: 'GET',
          url: '/api/beers/'+id
        }).
        success(function (data, status, headers, config) {
          $scope.cerveja = data;
          $scope.msg = 'Cerveja: '+data.name;
          $scope.cervejas.push(data);

        }).
        error(function (data, status, headers, config) {
          $scope.msg = 'Error!'
        });

      }).
      error(function (data, status, headers, config) {
        $scope.msg = 'Error!'
      });
    }

    $scope.listar = function(){
      $http({
        method: 'GET',
        url: url
      }).
      success(function (data, status, headers, config) {
        $scope.cervejas = data;
        $scope.msg = 'Listagem das cervejas'
      }).
      error(function (data, status, headers, config) {
        $scope.msg = 'Error!'
      });
    }

  }).
  controller('EventController', function($scope, Facebook, $FB) {

    $scope.events = [];
   
    $scope.$watch(function() {
      return $FB.isAuthenticated()
    }, function(value){
   
      console.log("VALUE isAuthenticated",value);
      // YEP, this will work.
      if(value) {
        console.log('worked');
        //$scope.facebook_friends = $FB.api('/me/friends');

      }
    },true);

  }).
  controller('PostController', function($scope, Facebook) {
    $scope.posts = [];

    var access_token = 'CAAGEC9IUwRMBAGLmu79Ber3F42ZBqlfwuCYwZAQZAsad9vSk4CrUAL9P06NmtUU4f740MUzecLJ6pAICd7VpjetbkdlPdOiPJZCZAcSikIRCF3qVJlDwynL9ZCAKBc9kV3FqmtPdme8arxJRnXZBZAFELFKM9dy3oVkc59dnz0lmUkyk2Pvz2G6Nkzjac5k9sRFLiqwGBFo4hAZDZD';
    var request = Facebook.getData(access_token, 'feed').then(
      function(response) {

        var posts = response.data.data;
        console.log(posts);

        angular.forEach(posts, function(value, key){
          $scope.posts.push(value);
        });

      },
      function(err) {

      }
    );
  });