$(function(){
        
    var barService = $('.barService');
    var sushiRolls = $('.sushiRolls');
    $('#changeToBar').on('click', function(){
        barService.css({
            opacity: 1,
            position: 'relative'
        });
        sushiRolls.css({
            opacity: 0,
            position: 'absolute'
        });
        $('#changeToBar').css({
            
        backgroundColor: "#6c4242",
        color: "#f5f5f5"});
        $('#changeToRolls').css({
            
            backgroundColor: "white",
            color: "#6c4242" 
        });
        
    })
    $('#changeToRolls').on('click', function(){
        barService.css({
            opacity: 0,
            position: 'absolute'
        });
        sushiRolls.css({
            opacity: 1,
            position: 'relative'
        });
        $('#changeToBar').css({
            
            backgroundColor: "white",
            color: "#6c4242" 
        })
        $('#changeToRolls').css({
            
        backgroundColor: "#6c4242",
        color: "#f5f5f5"
        })


    })
    
    
    
    //add video only when resolution > 1100px
   

   if($(window).width() > 800){
        $('body').append('<video autoplay muted loop id="bgvideo" poster="./website/imgs/chocolate.jpg"><source src="./website/video/edited.mp4"></video>');
    }
    else {
    //only add markup when screen size is large enough
          $('#bgvideo').remove();
          
    }

    
    
    //modal-menu window
function openModal($modal) {

  $('body')
  
    .addClass('showing-modal');
  $modal.fadeIn(500);
};

function closeModal($modal) {
    $('body')

      .removeClass('showing-modal');
    $modal.hide();
};


var $modal = $('#modalWindow');

$modal
	.click(function () {
		closeModal($modal);
	})
  .find('.modalContent').click(function (event) {
  	event.stopPropagation();
	});


$('#open').click(function (event) {
  event.preventDefault();
  openModal($modal);
});
    
//audio button 

    var adv = $('#playAudio');
    var audioButton = $('.audiobutton')
    audioButton.on('click', function() {
        if (adv[0].paused) {
            audioButton.html('Призупинити');
            adv[0].play();

        } else {
            adv[0].pause();
            audioButton.html('Прослухати');


        }     
    });
    
    
// Back to top button

	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});



})




///////
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

    

      $('#form').submit(function(e) {
          if ( $.trim($(this).val()) == "") {
               e.preventDefault();
          }
        
        var errors = false;
        $(this).find('span').empty();
        
        $(this).find('input, textarea').each(function(){
            if ( $.trim($(this).val()) == ""){
                errors = true;

            }
        })
        
        if (!errors){
            var data = $('#form').serialize();
        $.ajax({
            type: 'POST',
            url: './mail2.php',
            data: data
        }).done(function() {
           $('#send-result').html('Дякую. Ми отримали ваше повідомлення');
            $('#form').trigger('reset');
        })
        .fail(function() {
            $('#send-result').html('Спробуйте ще раз')

        })
        }

         return false;
        })
    
    

    
  
    
    
});










