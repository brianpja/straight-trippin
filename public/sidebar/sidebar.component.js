(function() {
  'use strict';

  angular.module('app')
    .component('sidebar', {
      controller,
      templateUrl: '/sidebar/sidebar-template.html'

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService', 'birthdayService', '$stateParams']
  function controller($state, $http, dataService, loginService, birthdayService, $stateParams) {
    const vm = this;

    vm.user = {};


    vm.$onInit = function() {
      if (!vm.user.img) {
        vm.getUser(loginService.user);
      }
    }



    vm.getUser = function(user) {
      return dataService.getUser(user)
        .then(function(response) {
          vm.user = response.data;
        })
    }


  }
}());
