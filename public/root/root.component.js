(function() {
  'use strict';
  console.log('root')

  angular.module('app')
    .component('root', {
      controller,
      templateUrl: 'root/root-template.html'

    })

  controller.$inject = ['$state', '$http', 'dataService']
  function controller($state, $http, dataService) {
    const vm = this;
    vm.userData = {};

    vm.$onInit = function() {

    }


  }
}());
