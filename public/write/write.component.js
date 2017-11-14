(function() {
  'use strict';

  angular.module('app')
    .component('write', {
      controller,
      templateUrl: '/write/write-template.html'

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService']
  function controller($state, $http, dataService, loginService) {
    const vm = this;

    vm.user = loginService.user;

    vm.styles = [];
    vm.selectedStyles = [];

    vm.$onInit = function() {
      vm.newPost = {};
      vm.getStyles();
      vm.checkCount = 0;
    }

    vm.getStyles = function() {
      return dataService.getStyles()
        .then(function(response) {
          vm.styles = response.data;
        })
    }

    vm.changeCount = function(style) {
      if (style.checked) {
        vm.checkCount++;
        vm.selectedStyles.push(style)
      }
      else {
        vm.checkCount--;
        const index = vm.findIndex(vm.selectedStyles, style);
        vm.selectedStyles.splice(index, 1);
      }
    }

    vm.submitPost = function(post) {
      post.user_id = vm.user.id;
      post.styles = vm.selectedStyles;
      return dataService.addPost(post)
        .then(function(response) {
          $state.go('home')
        })
    }

    vm.findIndex = function(arr, item) {
      for (const index in arr) {
        if (arr[index] === item) return index;
      }
    }

    vm.uploadFile = function(event) {
      if (!vm.newPost.images) {
        vm.newPost.images = [];
      }
      var files = event.target.files;

      if (files[0]) {
        const formData = new FormData();

        formData.append('file', files[0]);

        $http.post('/images', formData, {headers: {'Content-Type': undefined}})
          .then(function(response) {
            vm.newPost.images.push(response.data.url.replace('upload', 'upload/a_0'));
          })
      }
    }



  }
}());
