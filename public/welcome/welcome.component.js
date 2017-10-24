(function() {
  'use strict';
  console.log('welcome')

  angular.module('app')
    .component('welcome', {
      controller,
      templateUrl: 'welcome/welcome-template.html',
      bindings: {
        userData: '='
      }

    })

  controller.$inject = ['$state', '$http', 'dataService']
  function controller($state, $http, dataService) {
    const vm = this;

    vm.days = [];
    vm.months = [];
    vm.years = [];


    vm.$onInit = function() {
      vm.newUser = {year: 'Year', month: 'Month', day: 'Day'}
      // vm.newUser = vm.default;
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
          console.log(response);
          vm.userData = response.data;
          vm.userData.loggedIn = true;
          console.log('userData: ', vm.userData);
        })
    }

    vm.login = function(user) {
      console.log(user);
      return dataService.login(user)
        .then(function(response) {
          vm.userData = response.data;
          vm.userData.loggedIn = true;
          console.log('userData: ', vm.userData);
        })
    }


  }
}());
