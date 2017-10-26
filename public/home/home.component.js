(function() {
  'use strict';

  angular.module('app')
    .component('home', {
      controller,
      templateUrl: 'home/home-template.html',
      bindings: {
        userData: '='
      }
    })

  controller.$inject = ['$state', '$http', 'dataService']
  function controller($state, $http, dataService) {
    const vm = this;


    vm.$onInit = function() {
      vm.isLoggedIn()
        .then(function(response) {
          if (!response) {
            $state.go('welcome')
          } else {
            vm.getUserData(response);
          }
        })
    }

    vm.getUserData = function(user) {
      return dataService.getUser(user)
        .then(function(response) {
          vm.userData = response.data;
          vm.userData.loggedIn = true;
          console.log('userData: ', vm.userData)
        })
    }

    vm.isLoggedIn = function() {
      return dataService.isLoggedIn()
        .then(function(response) {
          return response.data;
        })
    }

    vm.getFeed = function() {
      return dataService.getFeed()
        .then(function(response) {
          console.log(response);
        })
    }
  }
}());
