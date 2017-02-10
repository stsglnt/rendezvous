module = angular.module('serviceApp', []);


module.directive('showErrors', function ($timeout, showErrorsConfig) {
      var getShowSuccess, linkFn;
      getShowSuccess = function (options) {
        var showSuccess;
        showSuccess = showErrorsConfig.showSuccess;
        if (options && options.showSuccess != null) {
          showSuccess = options.showSuccess;
        }
        return showSuccess;
      };
      linkFn = function (scope, el, attrs, formCtrl) {
        var blurred, inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses;
        blurred = false;
        options = scope.$eval(attrs.showErrors);
        showSuccess = getShowSuccess(options);
        inputEl = el[0].querySelector('[name]');
        inputNgEl = angular.element(inputEl);
        inputName = inputNgEl.attr('name');
        if (!inputName) {
          throw 'show-errors element has no child input elements with a \'name\' attribute';
        }
        inputNgEl.bind('blur', function () {
          blurred = true;
          return toggleClasses(formCtrl[inputName].$invalid);
        });
        scope.$watch(function () {
          return formCtrl[inputName] && formCtrl[inputName].$invalid;
        }, function (invalid) {
          if (!blurred) {
            return;
          }
          return toggleClasses(invalid);
        });
        scope.$on('show-errors-check-validity', function () {
          return toggleClasses(formCtrl[inputName].$invalid);
        });
        scope.$on('show-errors-reset', function () {
          return $timeout(function () {
            el.removeClass('has-error');
            el.removeClass('has-success');
            return blurred = false;
          }, 0, false);
        });
        return toggleClasses = function (invalid) {
          el.toggleClass('has-error', invalid);
          if (showSuccess) {
            return el.toggleClass('has-success', !invalid);
          }
        };
      };
      return {
        restrict: 'A',
        require: '^form',
        compile: function (elem, attrs) {

          return linkFn;
        }
      };
    }
  );
  
module.provider('showErrorsConfig', function () {
    var _showSuccess;
    _showSuccess = false;
    this.showSuccess = function (showSuccess) {
      return _showSuccess = showSuccess;
    };
    this.$get = function () {
      return { showSuccess: _showSuccess };
    };
  });

module.controller('serviceCtrl', function($scope, $http) {
  $scope.save = function() {
    $scope.$broadcast('show-errors-check-validity');
    
    if ($scope.userForm.$valid) {
      alert('User saved');
      $scope.reset();
    }
  };
  
  $scope.reset = function() {
    $scope.$broadcast('show-errors-reset');
    $scope.user = { name: '', email: '' };
  }

    


    
    
    /*sending form*/
    
    $scope.result = 'hidden';
    $scope.resultMessage;
    $scope.formData;
    $scope.submitted = false;
    
    $scope.submit = function(contactForm) {
        $scope.submitted = true;
        if (contactForm.$valid) {
            $http({
                method : 'POST',
                url    : 'contact.php',
                data   : $.param($scope.user),
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
            }).success(function(data){
                console.log(data);
                if (data.succes){
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                } else {
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });
            
        } else {
            $scope.resultMessage = 'Будь ласка, заповність поля';
            $scope.result = 'bg-danger'
        }
    }
    
    
    
});







