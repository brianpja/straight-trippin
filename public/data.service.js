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



    }
}());
