'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/eventos', {
      templateUrl: 'expose/event/list',
      controller: 'EventController'
    }).
    when('/posts', {
      templateUrl: 'expose/event/posts',
      controller: 'PostController'
    }).
    otherwise({
      redirectTo: '/eventos'
    });

  $locationProvider.html5Mode(true);
});
