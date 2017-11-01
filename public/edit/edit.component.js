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
      console.log('userData from edit: ', vm.userData)
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
          console.log('user: ', vm.user)
        })
    }

    vm.updateUser = function(user) {
      console.log(user);
      return dataService.updateUser(user)
        .then(function(response) {
          console.log(response);
          $state.go('home');
        })
    }

    vm.toggleShowInput = function() {
      vm.showInput = !vm.showInput;
    }

    vm.addImage = function(file, userId) {

      console.log('adding');
      console.log(vm.imageInput)
      const postObj = { file_name: file, id: userId }
      return dataService.addImage(postObj)
        .then(function(response) {
          console.log('response: ', response);
        })

    }

    vm.uploadFile = function(event){
        var files = event.target.files;
        console.log(files)

        if (files[0]) {
          const formData = new FormData();

          formData.append('file', files[0]);
          console.log('formData: ', formData)

          $http.post('/profile', formData, {headers: {'Content-Type': undefined}})
            .then(function(response) {
              console.log(response);
              vm.user.img = response.data.url;
            })
        }
    };


  }
}());
