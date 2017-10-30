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

    // vm.userData = loginService.user;
    vm.loginService = loginService;

    vm.$onInit = function() {

      loginService.isLoggedIn()
        .then(function(response) {
          // vm.userData = loginService.user;
          console.log('root new check: ', vm.userData, loginService.user, response)
          if (!response) {
            $state.go('welcome')
          }
          if (vm.loginService.user.loggedIn) {
            $state.go('home')
          }
        })

    }

    vm.logout = function() {
      console.log('logging out')
      return loginService.logout()
        .then(function(response) {
          console.log('userData: ', vm.userData);
          vm.userData = loginService.user;
          $state.go('welcome')
        })
    }




  }
}());
