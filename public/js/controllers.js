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
  controller('EventController', function($scope, Facebook, $FB) {

    // magic happens here
    
  }).
  controller('PostController', function($scope, Facebook) {
    $scope.posts = [];

    var access_token = 'CAAGEC9IUwRMBADUZAq3XR354fDm1VU9Wc10ZAxZBwF1IprNbp75nOIUqtGWQvDyowItTVHVR9dxhpyCZCjKRouLCiANjZCNZAr7YLoaiXEh0ZCef4AexAMvujUqJeDJGivFGxKoJVfcUqv7i6pctyLcrkYkKrRqTWncsdgXtDig8VEhZC6pTAHsnzZADdDZCNuquCI8THYShqeggZDZD';
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