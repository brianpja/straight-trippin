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

  controller.$inject = ['$state', '$http', 'dataService', 'loginService']
  function controller($state, $http, dataService, loginService) {
    const vm = this;


    vm.$onInit = function() {
      loginService.isLoggedIn()
        .then(function(response) {
          if (!response) {
            $state.go('welcome')
          } 
        })
    }

    // vm.getUserData = function(user) {
    //   return dataService.getUser(user)
    //     .then(function(response) {
    //       console.log('response:', response)
    //       vm.userData = response.data;
    //       vm.userData.loggedIn = true;
    //       console.log('userData: ', vm.userData)
    //     })
    // }

    // vm.isLoggedIn = function() {
    //   return loginService.isLoggedIn()
    //     .then(function(response) {
    //       return response.data;
    //     })
    // }

    vm.getFeed = function() {
      return dataService.getFeed()
        .then(function(response) {
          console.log(response);
        })
    }
  }
}());
