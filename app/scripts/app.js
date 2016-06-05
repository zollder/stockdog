'use strict';

/**
 * @ngdoc overview
 * @name stockdogApp
 * @description
 * # stockdogApp
 *
 * Main module of the application.
 */
angular
  .module('stockdogApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });
