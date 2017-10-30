(function() {
  'use strict';

  angular.module('app')
    .component('edit', {
      controller,
      templateUrl: 'edit/edit-template.html',

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService', 'birthdayService']
  function controller($state, $http, dataService, loginService, birthdayService) {
    const vm = this;

    vm.user = {};


    vm.$onInit = function() {
      vm.userData = loginService.user;
      console.log('userData from edit: ', vm.userData)
      vm.getUser(vm.userData)
        .then(function() {
          birthdayService.get(vm.user);
        })
      birthdayService.populate();
      vm.days = birthdayService.days;
      vm.months = birthdayService.months;
      vm.years = birthdayService.years;
    }

    vm.getUser = function(user) {
      return dataService.getUser(user)
        .then(function(response) {

          vm.user = response.data;
          console.log('user: ', vm.user)
        })
    }

    vm.updateUser = function(user) {
      console.log('working')
      console.log(user);
      return dataService.updateUser(user)
        .then(function(response) {
          console.log(response);
          $state.go('home');
        })
    }


  }
}());
