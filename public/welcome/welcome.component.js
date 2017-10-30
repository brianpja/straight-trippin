(function() {
  'use strict';

  angular.module('app')
    .component('welcome', {
      controller,
      templateUrl: '/welcome/welcome-template.html',
      bindings: {
        userData: '='
      }

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService', 'birthdayService']
  function controller($state, $http, dataService, loginService, birthdayService) {
    const vm = this;


    vm.$onInit = function() {
      vm.userData = loginService.user;
      vm.newUser = {year: 'Year', month: 'Month', day: 'Day'}
      birthdayService.populate();
      vm.days = birthdayService.days;
      vm.months = birthdayService.months;
      vm.years = birthdayService.years;

    }



    vm.addUser = function(user) {
      console.log('adding')
      return dataService.addUser(user)
        .then(function(response) {
          console.log('response: ', response);
          return loginService.isLoggedIn()
        })
        .then(function(response){
          if(response){
            $state.go('edit');

          }
        })
    }

    vm.login = function(user) {
      console.log(user);
      return loginService.login(user)
        .then(function(response) {
          console.log('userData: ', vm.userData);

          // TODO: WHat happens if log fails
          $state.go('home');
        })
        .catch(function(err){
          //login unsuccessful
        })
    }


  }
}());
