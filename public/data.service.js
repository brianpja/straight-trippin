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

      this.getFeed = function() {
        return $http.get(`/posts`)
          .then(function(response) {
            return response;
          })
      }

      this.addComment = function(obj) {
        return $http.post(`/comments`, obj)
          .then(function(response) {
            return response;
          })
      }

      this.updateUser = function(obj) {
        return $http.patch(`/users/${obj.id}`, obj)
          .then(function(response) {
            return response;
          })
      }


    }
}());
