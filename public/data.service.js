(function() {
  'use strict';

  angular.module('app')
    .service('dataService', service)

    service.$inject = ['$http']
    function service($http) {

      this.addUser = function(obj) {
        return $http.post(`/users`, obj)
          .then(function(response) {
            return response;
          })
      }


      
    }
}());
