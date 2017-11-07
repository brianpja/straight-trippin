(function() {
  'use strict';

  angular.module('app')
    .component('root', {
      controller,
      templateUrl: '/root/root-template.html'

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService']
  function controller($state, $http, dataService, loginService) {
    const vm = this;

    vm.loginService = loginService;

    vm.$onInit = function() {
      loginService.isLoggedIn()
        .then(function(response) {
          if (!response) {
            $state.go('welcome')
          }
        })
    }

    vm.logout = function() {
      return loginService.logout()
        .then(function(response) {
          $state.go('welcome')
        })
    }


  }
}());
