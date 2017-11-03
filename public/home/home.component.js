(function() {
  'use strict';

  angular.module('app')
    .component('home', {
      controller,
      templateUrl: 'home/home-template.html',

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService']
  function controller($state, $http, dataService, loginService) {
    const vm = this;
    vm.user = {};
    vm.feed = [];

    vm.$onInit = function() {
      loginService.isLoggedIn()
        .then(function(response) {
          if (!response) {
            $state.go('welcome')
          }
        })

        vm.userData = loginService.user;
        vm.getUser(vm.userData);
        vm.getFeed()
          .then(function() {

          })
    }

    vm.getUser = function(user) {
      return dataService.getUser(user)
        .then(function(response) {
          vm.user = response.data;
        })
    }


    vm.getFeed = function() {
      return dataService.getFeed()
        .then(function(response) {
          vm.feed = response.data;
        })
    }

    vm.toggleComments = function(post) {
      post.showComments = !post.showComments;
    }

    vm.postComment = function(post) {

      const commentObj = {
        user_id: vm.user.id,
        post_id: post.post_id,
        content: post.commentInput
      }

      return dataService.addComment(commentObj)
        .then(function(response) {
          const retObj = response.data;

          retObj.first_name = vm.user.first_name;
          retObj.last_name = vm.user.last_name;
          retObj.img = vm.user.img;

          post.comments.push(retObj);
          post.showComments = true;
          delete post.commentInput;
        })
    }

  }
}());
