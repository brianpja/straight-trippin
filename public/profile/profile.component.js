(function() {
  'use strict';

  angular.module('app')
    .component('profile', {
      controller,
      templateUrl: '/profile/profile-template.html'

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService', '$stateParams']
  function controller($state, $http, dataService, loginService, $stateParams) {
    const vm = this;

    vm.user = loginService.user;
    vm.profile = {};
    vm.posts = [];

    vm.$onInit = function() {
      const idObj = {id: $stateParams.id}

      vm.getProfile(idObj)
        .then(function() {
          vm.calculateAge(vm.profile.birthdate)
        })

      vm.getPosts(idObj);
      vm.getUser(vm.user);
    }


    vm.getProfile = function(obj) {
      return dataService.getUser(obj)
        .then(function(response) {
          console.log(response);
          vm.profile = response.data;
        })
    }

    vm.getUser = function(user) {
      return dataService.getUser(user)
        .then(function(response) {

          vm.user = response.data;
          console.log('user: ', vm.user)
        })
    }

    vm.getPosts = function(profile) {
      return dataService.getPosts(profile)
        .then(function(response) {
          console.log(response);
          vm.posts = response.data;
        })
    }

    vm.calculateAge = function(date) {
      console.log(date)
    }

    vm.toggleComments = function(post) {
      post.showComments = !post.showComments;
    }

    vm.postComment = function(post) {
      console.log('posting', post)

      const commentObj = {
        user_id: vm.user.id,
        post_id: post.post_id,
        content: post.commentInput
      }

      return dataService.addComment(commentObj)
        .then(function(response) {
          console.log('response', response);
          console.log('current user', vm.user)
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
