(function() {
  'use strict';

  angular.module('app')
    .component('home', {
      controller,
      templateUrl: 'home/home-template.html',

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService']
  function controller($state, $http, dataService, loginService) {
    const vm = this;
    vm.user = {};
    vm.feed = [];

    vm.$onInit = function() {
      loginService.isLoggedIn()
        .then(function(response) {
          if (!response) {
            $state.go('welcome')
          }
        })

        vm.userData = loginService.user.data;
        console.log('from home', vm.userData)
        vm.getUser(vm.userData);
        vm.getFeed()
          .then(function() {
            console.log('feed: ', vm.feed)

          })
    }

    vm.getUser = function(user) {
      return dataService.getUser(user)
        .then(function(response) {
          console.log('response:', response)
          vm.user = response.data;
          console.log('user: ', vm.user)
        })
    }


    vm.getFeed = function() {
      return dataService.getFeed()
        .then(function(response) {
          vm.feed = response.data;
        })
    }
  }
}());
