(function() {
  'use strict';

  angular.module('app')
    .component('edit', {
      controller,
      templateUrl: 'edit/edit-template.html',

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService', 'birthdayService']
  function controller($state, $http, dataService, loginService, birthdayService) {
    const vm = this;

    vm.user = {};


    vm.$onInit = function() {
      vm.userData = loginService.user;

      vm.getUser(vm.userData)
        .then(function() {
          birthdayService.get(vm.user);
        })
      birthdayService.populate();
      vm.days = birthdayService.days;
      vm.months = birthdayService.months;
      vm.years = birthdayService.years;
      vm.showInput = false;
    }

    vm.getUser = function(user) {
      return dataService.getUser(user)
        .then(function(response) {
          vm.user = response.data;
        })
    }

    vm.updateUser = function(user) {
      return dataService.updateUser(user)
        .then(function(response) {
          $state.go('home');
        })
    }

    vm.toggleShowInput = function() {
      vm.showInput = !vm.showInput;
    }


    vm.uploadFile = function(event){
        var files = event.target.files;

        if (files[0]) {
          const formData = new FormData();

          formData.append('file', files[0]);

          $http.post('/profile', formData, {headers: {'Content-Type': undefined}})
            .then(function(response) {
              vm.user.img = response.data.url;
            })
        }
    };


  }
}());
