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

  controller.$inject = ['$state', '$http', 'dataService', 'loginService', 'birthdayService', '$timeout']
  function controller($state, $http, dataService, loginService, birthdayService, $timeout) {
    const vm = this;


    vm.$onInit = function() {
      vm.userData = loginService.user;
      vm.newUser = {year: 'Year', month: 'Month', day: 'Day'}
      birthdayService.populate();
      vm.days = birthdayService.days;
      vm.months = birthdayService.months;
      vm.years = birthdayService.years;
      vm.showLoginError = false;
      vm.showSignupError = false;
    }



    vm.addUser = function(user) {
      return dataService.addUser(user)
        .then(function(response) {
          return loginService.isLoggedIn()
        })
        .then(function(response){
          if(response){
            $state.go('edit');
          }
        })
        .catch(function(err) {
          vm.signupError = err.data.output.payload.message;
          vm.showSignupError = true;
          $timeout(() => {
            vm.showSignupError = false;
          }, 3000)
        })
    }

    vm.login = function(user) {
      return loginService.login(user)
        .then(function(response) {

          // TODO: WHat happens if log fails
          $state.go('home');
        })
        .catch(function(err){
          vm.loginError = err.data.output.payload.message;
          vm.showLoginError = true;
          $timeout(() => {
            vm.showLoginError = false;
          }, 3000)
        })
    }


  }
}());
