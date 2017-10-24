(function() {
  'use strict';
  console.log('edit')

  angular.module('app')
    .component('edit', {
      controller,
      templateUrl: 'edit/edit-template.html'
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
