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

    vm.$onInit = function() {
      vm.userData = loginService.user;

      loginService.isLoggedIn()
        .then(function(response) {
          if (!response) {
            $state.go('welcome')
          }
        })

    }

    vm.logout = function() {
      console.log('logging out')
      return loginService.logout()
        .then(function(response) {
          console.log('userData: ', vm.userData);
          $state.go('welcome')
        })
    }




  }
}());
