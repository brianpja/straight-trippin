(function() {
  'use strict';

  angular.module('app')
    .service('birthdayService', service)

  service.$inject = ['$http', '$filter']

  function service($http, $filter) {

    const vm = this;

    vm.days = [];
    vm.months = [];
    vm.years = [];

    this.populate = function() {

      this.createDays();
      this.createMonths();
      this.createYears();
    }

    this.createDays = function() {
      const arr = [];
      for (let i = 1; i <= 31; i++) {
        arr.push(i);
      }
      vm.days = arr;
    }

    this.createMonths = function() {
      const arr = [];
      for (let i = 1; i <= 12; i++) {
        arr.push(i);
      }
      vm.months = arr;
    }

    this.createYears = function() {
      const arr = [];
      for (let i = 2010; i >= 1932; i--) {
        arr.push(i);
      }
      vm.years = arr;
    }

    this.get = function(user) {
      user.day = $filter('date')(user.birthdate, 'd');
      user.month = $filter('date')(user.birthdate, 'M');
      user.year = $filter('date')(user.birthdate, 'yyyy')
    }

    this.calculateAge = function(date) {
      let now = new Date();
      now = now.toISOString();

      const birthYear = parseInt(date.slice(0, 4));
      const birthMonth = parseInt(date.slice(5, 7));
      const birthDay = parseInt(date.slice(8, 10));

      const nowYear = parseInt(now.slice(0, 4));
      const nowMonth = parseInt(now.slice(5, 7));
      const nowDay = parseInt(now.slice(8, 10));

      let age = nowYear - birthYear;

      if (birthMonth > nowMonth) {
        age--;
      }

      if (birthMonth === nowMonth && birthDay > nowDay) {
        age--;
      }

      return age;
    }



  }
}());
