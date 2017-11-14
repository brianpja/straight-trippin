(function() {
  'use strict';

  angular.module('app')
    .component('profile', {
      controller,
      templateUrl: '/profile/profile-template.html'

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService', '$stateParams', 'birthdayService', 'preloader']
  function controller($state, $http, dataService, loginService, $stateParams, birthdayService, preloader) {
    const vm = this;

    vm.user = loginService.user;
    vm.profile = {};
    vm.posts = [];
    vm.images = [];

    vm.$onInit = function() {
      const idObj = {id: $stateParams.id}

      vm.getProfile(idObj)
        .then(function() {
          vm.profile.age = birthdayService.calculateAge(vm.profile.birthdate)
          console.log(vm.profile)
        })

      vm.getPosts(idObj)
        .then(function() {
          console.log(vm.posts);
          for (const post of vm.posts) {
            for (const image of post.images) {
              vm.images.push(image.url);
            }
          }
          preloader.preloadImages(vm.images);
        })

      vm.getUser(vm.user);
    }


    vm.getProfile = function(obj) {
      return dataService.getUser(obj)
        .then(function(response) {
          vm.profile = response.data;
        })
    }

    vm.getUser = function(user) {
      return dataService.getUser(user)
        .then(function(response) {
          vm.user = response.data;
        })
    }

    vm.getPosts = function(profile) {
      return dataService.getPosts(profile)
        .then(function(response) {
          vm.posts = response.data;
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

    vm.findIndex = function(arr, item) {
      for (const index in arr) {
        if (arr[index].post_id === item.id) return index;
      }
    }

    vm.deletePost = function(post) {
      return dataService.deletePost(post)
        .then(function(response) {
          const index = vm.findIndex(vm.posts, response.data);
          vm.posts.splice(index, 1);
        })
    }

    vm.showDelete = function(obj) {
      obj.showDelete = true;
    }

    vm.noDelete = function(obj) {
      obj.showDelete = false;
    }

    vm.deleteComment = function(comment) {
      console.log(comment);
      return dataService.deleteComment(comment)
        .then(function(response) {
          console.log(response);
          const postIndex = vm.findPostIndex(vm.posts, response.data);
          const commentIndex = vm.findCommentIndex(vm.posts[postIndex].comments, response.data);
          vm.posts[postIndex].comments.splice(commentIndex, 1);
        })
    }

    vm.findPostIndex = function(arr, item) {
      for (const index in arr) {
        if (arr[index].post_id === item.post_id) return index;
      }
    }

    vm.findCommentIndex = function(arr, item) {
      for (const index in arr) {
        if (arr[index].comment_id === item.id) return index;
      }
    }

    vm.imageRight = function(post) {
      if (post.imageCounter === post.images.length) {
        post.imageCounter = 1;
      } else {
        post.imageCounter++;
      }

      $(`img[data-id="${post.post_id}"].post-image`).fadeOut('fast', function() {
          if (post.imagePointer === post.images.length - 1) {
            post.imagePointer = 0;
          } else {
            post.imagePointer++;
          }
          this.src = post.images[post.imagePointer].url
          $(`img[data-id="${post.post_id}"].post-image`).fadeIn('fast')
        })
    }

    vm.imageLeft = function(post) {
      if (post.imageCounter === 1) {
        post.imageCounter = post.images.length;
      } else {
        post.imageCounter--;
      }

      $(`img[data-id="${post.post_id}"].post-image`).fadeOut('fast', function() {
        if (post.imagePointer === 0) {
          post.imagePointer = post.images.length - 1;
        } else {
          post.imagePointer--;
        }
        this.src = post.images[post.imagePointer].url;
        $(`img[data-id="${post.post_id}"].post-image`).fadeIn('fast');
      })
    }

  }
}());
