

angular.module('app').directive('fileupload', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      console.log(attrs)
      var onChangeHandler = scope.$eval(attrs.fileupload);
      element.bind('change', onChangeHandler);
      element.on('$destroy', function() {
        element.unbind('change');
      });

    }
  };
});
