(function() {
  'use strict';
  console.log('home')

  angular.module('app')
    .component('home', {
      controller,
      templateUrl: 'home/home-template.html'
      bindings: {
        userData: '='
      }
    })

  controller.$inject = ['$state', '$http', 'dataService']
  function controller($state, $http, dataService) {
    const vm = this;


    vm.$onInit = function() {

    }


  }
}());
