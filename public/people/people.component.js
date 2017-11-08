(function() {
  'use strict';

  angular.module('app')
    .component('people', {
      controller,
      templateUrl: '/people/people-template.html'

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService', 'birthdayService']
  function controller($state, $http, dataService, loginService, birthdayService) {
    const vm = this;

    vm.user = {};
    vm.people = [];

    vm.$onInit = function() {
      vm.getUser(loginService.user);
      console.log('user: ', vm.user)
      vm.getUsers()
        .then(function() {
          vm.users = vm.people.map(function(obj) {
            obj.age = birthdayService.calculateAge(obj.birthdate)
            return obj;
          })
          console.log(vm.people);
        })
    }

    vm.getUsers = function() {
      return dataService.getAllUsers()
        .then(function(response) {
          console.log(response);
          vm.people = response.data;
        })
    }

    vm.getUser = function(user) {
      return dataService.getUser(user)
        .then(function(response) {
          vm.user = response.data;
        })
    }


  }
}());
