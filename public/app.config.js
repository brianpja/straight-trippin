(function() {
  'use strict';
  console.log('config')
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
        url: '/welcome',
        component: 'welcome',
        parent: 'root'
      })
      .state({
        name: 'edit',
        url: '/edit',
        component: 'edit',
        parent: 'root'
      })

  }
}());
