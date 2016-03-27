
$(document).ready(function() {
	if ($(window).width() > 767) {
    $('#fullpage').fullpage({
    	scrollBar:true,
			anchors: ['home', 'about', 'music', 'tour', 'contact'],
			scrollingSpeed: 800,
			navigation: true,
			navigationPosition: 'right',
    });
  }

  $('.carousel').carousel({
	  interval: 15000
	});

	$(".tour-carousel").owlCarousel({
		center: true,
    items:2,
    loop: true,
    navText: ['<img src="img/ca-left-a.png">', '<img src="img/ca-right-a.png">'],
    margin: 0,
    responsive:{
        0:{
            items:1
        },
        768:{
            items:2
        }
    }
	});

});