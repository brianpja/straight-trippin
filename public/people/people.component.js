(function() {
  'use strict';

  angular.module('app')
    .component('people', {
      controller,
      templateUrl: '/people/people-template.html'

    })

  controller.$inject = ['$state', '$http', 'dataService', 'loginService', 'birthdayService']
  function controller($state, $http, dataService, loginService, birthdayService) {
    const vm = this;

    vm.user = {};
    vm.people = [];
    vm.follows = [];
    vm.showFollow = false;

    vm.$onInit = function() {

      vm.getUsers()
        .then(function() {
          vm.people = vm.people.map(function(obj) {
            obj.age = birthdayService.calculateAge(obj.birthdate)
            return obj;
          })
        })
        .then(function() {
          return vm.getUser(loginService.user)
        })
        .then(function() {
          return vm.getFollows(vm.user)
        })
        .then(function() {
          vm.people = vm.people.map(function(person) {
            person.isFollow = false;

            for (const follow of vm.follows) {
              if (person.id === follow.friend_id) {
                person.isFollow = true;
                break;
              }
            }
            return person;
          })
          console.log('last list: ', vm.people)
        })
    }

    vm.getUsers = function() {
      return dataService.getAllUsers()
        .then(function(response) {
          console.log(response);
          vm.people = response.data;
        })
    }

    vm.getUser = function(user) {
      return dataService.getUser(user)
        .then(function(response) {
          vm.user = response.data;
        })
    }

    vm.logout = function() {
      return loginService.logout()
        .then(function(response) {
          $state.go('welcome');
        })
    }

    vm.follow = function(person) {
      const postObj = {user_id: vm.user.id, friend_id: person.id};
      return dataService.follow(postObj)
        .then(function(response) {
          console.log(response);
          vm.follows.push(response.data);
          person.isFollow = true;
          console.log(vm.follows);
        })
    }

    vm.getFollows = function(user) {
      return dataService.getFollows(user)
        .then(function(response) {
          console.log(response.data);
          vm.follows = response.data;
        })
    }

    vm.unfollow = function(person) {
      console.log('click')
      const followObj = {user_id: vm.user.id, friend_id: person.id};
      const followId = vm.findFollowId(followObj);
      if (followId) {
        return dataService.unfollow(followId)
        .then(function(response) {
          console.log(response);
          const followIndex = vm.findFollowIndex(person, vm.follows);
          vm.follows.splice(followIndex, 1);
          person.isFollow = false;
          console.log(vm.follows)
        })
      }
    }

    vm.findFollowId = function(obj) {
      for (const follow of vm.follows) {
        if (obj.user_id === follow.user_id && obj.friend_id === follow.friend_id) {
          return follow.id
        }
      }
    }

    vm.findFollowIndex = function(person, arr) {
      for (const index in arr) {
        if (arr[index].friend_id === person.id) return index;
      }
    }


  }
}());
