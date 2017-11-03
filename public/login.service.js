(function() {
  'use strict';

  angular.module('app')
    .service('loginService', service)

  service.$inject = ['$http']

  function service($http) {

    const vm = this;

    vm.user = {};

    this.login = function(obj) {
      return $http.post(`/token`, obj)
        .then(function(response) {
          vm.user = response.data;
          return response;
        })
    }

    this.logout = function() {
      return $http.delete(`/token`)
        .then(function(response) {
          vm.user = response.data;
          return response;
        })
    }

    this.isLoggedIn = function() {
      return $http.get(`/token`)
        .then(function(response) {
          if (response.data) {
            vm.user = response.data;
          } else {
            vm.user.loggedIn = false;
          }
          return response.data;
        })
    }

  }
}());
