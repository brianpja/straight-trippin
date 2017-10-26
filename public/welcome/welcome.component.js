(function() {
  'use strict';

  angular.module('app')
    .component('welcome', {
      controller,
      templateUrl: '/welcome/welcome-template.html',
      bindings: {
        userData: '='
      }

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService']
  function controller($state, $http, dataService, loginService) {
    const vm = this;

    vm.days = [];
    vm.months = [];
    vm.years = [];


    vm.$onInit = function() {
      vm.userData = loginService.user;
      vm.newUser = {year: 'Year', month: 'Month', day: 'Day'}
      vm.createDays();
      vm.createMonths();
      vm.createYears();
    }

    vm.createDays = function() {
      for (let i = 1; i <= 31; i++) {
        vm.days.push(i);
      }
    }

    vm.createMonths = function() {
      for (let i = 1; i <= 12; i++) {
        vm.months.push(i);
      }
    }

    vm.createYears = function() {
      for (let i = 2010; i >= 1932; i--) {
        vm.years.push(i);
      }
    }

    vm.addUser = function(user) {
      console.log('adding')
      return dataService.addUser(user)
        .then(function(response) {
          console.log('response: ', response);
          return loginService.isLoggedIn()
        })
        .then(function(response){
          if(response){
            $state.go('edit');

          }
        })
    }

    vm.login = function(user) {
      console.log(user);
      return loginService.login(user)
        .then(function(response) {
          console.log('userData: ', vm.userData);

          // TODO: WHat happens if log fails
          $state.go('home');
        })
        .catch(function(err){
          //login unsuccessful
        })
    }


  }
}());
