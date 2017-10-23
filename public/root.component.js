(function() {
  'use strict';
  console.log('root')

  angular.module('app')
    .component('root', {
      controller,
      template: '<h1>Brian you smart</h1>'

    })

  controller.$inject = ['$state', '$http']
  function controller($state, $http) {
    const vm = this;

    vm.$onInit = function() {
      console.log('working')

      $http.get(`/users`)
        .then(function(response) {
          console.log(response);
        })
    }


  }
}());
