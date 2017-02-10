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
        $('body').append('<video autoplay muted loop id="bgvideo" poster="imgs/chocolate.jpg"><source src="video/The%20Art%20of%20Coffee-SD%20cut2.mp4"></video>');
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


