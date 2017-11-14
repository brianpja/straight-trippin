(function() {
  'use strict';

  angular.module('app')
    .component('home', {
      controller,
      templateUrl: 'home/home-template.html',

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService', '$timeout', 'preloader']

  function controller($state, $http, dataService, loginService, $timeout, preloader) {
    const vm = this;
    vm.user = {};
    vm.feed = [];
    vm.searchBy = 'full_name'
    vm.images = [];

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
          console.log(vm.feed);
          vm.feed = vm.feed.map(function(post) {
            post.full_name = `${post.first_name} ${post.last_name}`
            post.types = '';
            for (const style of post.styles) {
              post.types += style.name + ' ';
            }
            return post;
          })

          for (const post of vm.feed) {
            for (const image of post.images) {
              vm.images.push(image.url);
            }
          }
        })
        .then(function() {
          preloader.preloadImages(vm.images);
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
          // retObj.showDelete = false;

          post.comments.push(retObj);
          post.showComments = true;
          delete post.commentInput;
          console.log(post)
        })
    }

    vm.logout = function() {
      return loginService.logout()
        .then(function(response) {
          $state.go('welcome');
        })
    }

    vm.deletePost = function(post) {
        return dataService.deletePost(post)
        .then(function(response) {
          const index = vm.findIndex(vm.feed, response.data);
          vm.feed.splice(index, 1);
        })
    }

    vm.findIndex = function(arr, item) {
      for (const index in arr) {
        if (arr[index].post_id === item.id) return index;
      }
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
          const postIndex = vm.findPostIndex(vm.feed, response.data);
          const commentIndex = vm.findCommentIndex(vm.feed[postIndex].comments, response.data);
          vm.feed[postIndex].comments.splice(commentIndex, 1);
          console.log(vm.feed);
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
          console.log(this)
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
