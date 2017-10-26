(function() {
  'use strict';

  angular.module('app')
    .service('dataService', service)

    service.$inject = ['$http']
    function service($http) {

      this.getUser = function(obj) {
        return $http.get(`/users/${obj.id}`)
          .then(function(response) {
            return response;
          })
      }

      this.addUser = function(obj) {
        return $http.post(`/users`, obj)
          .then(function(response) {
            return response;
          })
      }

      this.login = function(obj) {
        return $http.post(`/token`, obj)
          .then(function(response) {
            return response;
          })
      }

      this.logout = function() {
        return $http.delete(`/token`)
          .then(function(response) {
            return response;
          })
      }

      this.isLoggedIn = function() {
        return $http.get(`/token`)
          .then(function(response) {
            return response;
          })
      }

    }
}());
