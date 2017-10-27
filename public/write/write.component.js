(function() {
  'use strict';

  angular.module('app')
    .component('write', {
      controller,
      templateUrl: '/write/write-template.html'

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService']
  function controller($state, $http, dataService, loginService) {
    const vm = this;


    vm.$onInit = function() {

    }




  }
}());
