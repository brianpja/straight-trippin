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

    vm.styles = [];
    vm.selectedStyles = [];

    vm.$onInit = function() {
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
      console.log(style);
      if (style.checked) {
        vm.checkCount++;
        vm.selectedStyles.push(style)
      }
      else {
        vm.checkCount--;
        const index = vm.findIndex(vm.selectedStyles, style);
        vm.selectedStyles.splice(index, 1);
      }
      console.log('count', vm.checkCount)
      console.log('selectedStyles: ', vm.selectedStyles)
    }

    vm.submitPost = function(post) {
      post.styles = vm.selectedStyles;
      return dataService.addPost(post)
        .then(function(response) {
          console.log(response);
        })
    }

    vm.findIndex = function(arr, item) {
      for (const index in arr) {
        if (arr[index] === item) return index;
      }
    }

  }
}());
