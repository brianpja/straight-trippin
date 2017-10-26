(function() {
  'use strict';

  angular.module('app')
    .component('root', {
      controller,
      templateUrl: '/root/root-template.html'

    })

  controller.$inject = ['$state', '$http', 'dataService']
  function controller($state, $http, dataService) {
    const vm = this;

    vm.$onInit = function() {
      vm.userData = {loggedIn: false};

    }

    vm.logout = function() {
      console.log('logging out')
      return dataService.logout()
        .then(function(response) {
          console.log(response)
          vm.userData = {loggedIn: false}
          console.log(vm.userData);
          $state.go('welcome')
        })
    }




  }
}());
