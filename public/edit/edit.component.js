(function() {
  'use strict';

  angular.module('app')
    .component('edit', {
      controller,
      templateUrl: 'edit/edit-template.html',

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService']
  function controller($state, $http, dataService, loginService) {
    const vm = this;


    vm.$onInit = function() {
      vm.userData = loginService.user;
      console.log('userData from edit: ', vm.userData)
    }


  }
}());
