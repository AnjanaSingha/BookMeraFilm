'use strict';

var angular = require('angular');
require('angular-route');

var app = angular.module('theatreApp', ['ngRoute','angular.filter']);

require('./controller');
require('./service');

app.config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl: 'views/Home.html',
    controller: 'MovieController',
    // access: {restricted: false}
  }).when('/theatre',{
    templateUrl: 'views/theatre.html',
    controller: 'MainController',
        access: {restricted: true}
  }).when('/movie',{
    templateUrl: 'views/movie.html',
   controller: 'MovieController',
       access: {restricted: true}
 }).when('/mapping',{
   templateUrl: 'views/mapping.html',
  controller: 'MappingController',
    access: {restricted: true}
}).when('/booking',{
    templateUrl: 'views/BookingShow.html',
   controller: 'BookingController',
  //  access: {restricted: false}
  }).when('/seats',{
    templateUrl: 'views/BookingSeats.html',
   controller: 'SeatsController',
  //  access: {restricted: false}
 }).when('/payment',{
   templateUrl: 'views/payment.html',
  controller: 'PaymentController',
  // access: {restricted: false}
}).when('/confirm',{
  templateUrl: 'views/ConfirmPage.html',
 controller: 'ConfirmController',
 // access: {restricted: false}
}).when('/feedback',{
  templateUrl: 'views/Feedback.html',
 controller: 'FeedbackController',
 access: {restricted: true}
}).when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      access: {restricted: false}
    }).when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController',
      access: {restricted: false}
    }).when('/logout', {
      controller: 'LogoutController',
      access: {restricted: true}
    })
    .when('/admin', {
      templateUrl: 'views/admin.html',
      // controller: 'MovieController',
      //  access: {restricted: true}
    });
});

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});
