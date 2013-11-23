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
  controller('EventController', function($scope, Facebook) {

    $scope.events = [];

    // var search = 'SELECT name, all_members_count, attending_count, creator FROM event WHERE can_invite_friends = 1';
    // var sql = 'fql?q=' + search;

    //var search = 'SELECT name, all_members_count, attending_count, creator FROM event WHERE can_invite_friends = 1';
    //var sql = 'fql?q=SELECT+name+all_members_count+attending_count+creator+FROM+event+WHERE+can_invite_friends=1';
    var access_token = 'CAACEdEose0cBAFSGJZBvNinNa4RGw8THjCnPwu9o7aYnc81hKE8LzZCPiIQx8ePwR4N0hxOmBfxT8jECr6n7GptEuz5349JF7kBkzOfK3pKnAo2ziLw0T3EPb7tK2gjQNEkb5wJlZBGxgfhXHpBE0xZApV1VCOaUIjGuh733ti9iZATJGdVjoy8hJzksc5V7yZCleXtwQ0PgZDZD';
    
    var sql = 'SELECT name, location, fan_count, were_here_count FROM page WHERE contains("mcdonalds")';

    var request = Facebook.getData('access_token', 'events', sql).then(
      function(response) {

        var events = response.data.data;
        console.log(events);

        angular.forEach(events, function(value, key){
          $scope.events.push(value);
        });

      },
      function(err) {

      }
    );

  }).
  controller('PostController', function($scope, Facebook) {
    $scope.posts = [];

    var access_token = 'CAACEdEose0cBAFSGJZBvNinNa4RGw8THjCnPwu9o7aYnc81hKE8LzZCPiIQx8ePwR4N0hxOmBfxT8jECr6n7GptEuz5349JF7kBkzOfK3pKnAo2ziLw0T3EPb7tK2gjQNEkb5wJlZBGxgfhXHpBE0xZApV1VCOaUIjGuh733ti9iZATJGdVjoy8hJzksc5V7yZCleXtwQ0PgZDZD';
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
