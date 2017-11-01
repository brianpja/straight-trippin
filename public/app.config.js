(function() {
  'use strict';
  angular.module('app').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state({
        name: 'root',
        component: 'root',
        abstract: true
      })
      .state({
        name: 'home',
        url: '/',
        component: 'home',
        parent: 'root'
      })
      .state({
        name: 'welcome',
        url: '/welcome/',
        component: 'welcome',
        parent: 'root'
      })
      .state({
        name: 'edit',
        url: '/edit/',
        component: 'edit',
        parent: 'root'
      })
      .state({
        name: 'profile',
        url: '/profile/:id',
        component: 'profile',
        parent: 'root'
      })
      .state({
        name: 'write',
        url: '/write/',
        component: 'write',
        parent: 'root'
      })

  }
}());
