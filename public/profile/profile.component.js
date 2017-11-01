(function() {
  'use strict';

  angular.module('app')
    .component('profile', {
      controller,
      templateUrl: '/profile/profile-template.html'

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService', '$stateParams']
  function controller($state, $http, dataService, loginService, $stateParams) {
    const vm = this;

    vm.profile = {};
    vm.posts = [];

    vm.$onInit = function() {
      const idObj = {id: $stateParams.id}

      vm.getProfile(idObj);
      vm.getPosts(idObj);
    }


    vm.getProfile = function(obj) {
      return dataService.getUser(obj)
        .then(function(response) {
          console.log(response);
          vm.profile = response.data;
        })
    }

    vm.getPosts = function(profile) {
      return dataService.getPosts(profile)
        .then(function(response) {
          console.log(response);
          vm.posts = response.data;
        })
    }


  }
}());
