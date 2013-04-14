// You can take this refresh out as most people don't resize their page, this is for the demo
/*================================================================*/
/*	REFRESH IF WINDOW IS UNDER OR OVER 849 PX WIDE (removed 20px for scroll bar, that's why)
/*================================================================*/
var ww = $(window).width();
var limit = 849; 

function refresh() {
   ww = $(window).width();
   var w =  ww<limit ? (location.reload(true)) :  ( ww>limit ? (location.reload(true)) : ww=limit );
}

var tOut;
$(window).resize(function() {
    var resW = $(window).width();
    clearTimeout(tOut);
    if ( (ww>limit && resW<limit) || (ww<limit && resW>limit) ) {        
        tOut = setTimeout(refresh, 100);
    }
}); 


/*================================================================*/
/*	SCROLL MAGIC for fixed header at 145px 
/*================================================================*/
if (document.documentElement.clientWidth > limit) { 
$(window).scroll(function() 
{ var scroll = $(window).scrollTop(); if (scroll >= 145) 
		{ $(".menu_wrapper, body, .preheader").addClass("fixed"); 
	} 
if (scroll <= 145) 
	{ $(".menu_wrapper, body, .preheader").removeClass("fixed"); 
	} 
}); 
} //

/*================================================================*/
/*	TRIGGER EQUAL COLUMNS AT 849 px 
/*================================================================*/
$(window).load(function(){
if (document.documentElement.clientWidth > limit) { //if client width is greater than 849px load equal columns

(function($) {

    $.fn.eqHeights = function() {

        var el = $(this);
        if (el.length > 0 && !el.data('eqHeights')) {
            $(window).bind('resize.eqHeights', function() {
                el.eqHeights();
            });
            el.data('eqHeights', true);
        }
        return el.each(function() {
            var curHighest = 0;
            $(this).children().each(function() {
                var el = $(this),
                    elHeight = el.height('auto').height();
                if (elHeight > curHighest) {
                    curHighest = elHeight;
                }
            }).height(curHighest);
        });
    };

    $('#equalHeights,#equalHeightsA,#equalHeightsB,#equalHeightsC,#equalHeightsD').eqHeights(); /*one time per page unless you make another id to add here */

}(jQuery));
} // end if
}); // end windowload


/*================================================================*/
/*	FADE ALL EXCEPT HOVERED
/*================================================================*/
$(document).ready(function() {
$('.image-widget li').hover(function(){
	$(this).siblings().addClass('fade');
	}, function(){
	$(this).siblings().removeClass('fade');
	});
});


/*================================================================*/
/*	SWITCH TO MULIT-LEVEL ACCORDION when mobile
/*================================================================*/
if (document.documentElement.clientWidth < limit) { //if client width is less than 767px

$(document).ready(function() {

// accordion
/*$('.accordmobile').dcAccordion({
		eventType: 'click',
		saveState: false,
		autoClose: true,
		disableLink: true,
		speed: 'fast',
		showCount: false,
		autoExpand: false,
		classExpand	 : 'parent'
});*/

});	// end document ready
				
} // end if 

$(document).ready(function(){

// $('.hero-unit h1, .hero-unit h2').after('<span></span>');

/*================================================================*/
/*	MOBILE NAV TRIGGER
/*================================================================*/
$('.mobile_nav a').click(function(){
	$('#main_menu').slideToggle(100);
	$(this).toggleClass('active'); return false;
});

/*================================================================*/
/*	LOGIN FORM SLIDE DOWN
/*================================================================*/
$('.user li.login, #loginform a.closethis').click(function(){
	$('#loginform').slideToggle(400);
	return false;
});
	
/*================================================================*/
/*	ADD CLASSES TO VARIOUS THINGS TO FIX IE
/*================================================================*/
$(".sort li:first-child").addClass('first');
$(".sort li:last-child, .footerPosts li:last-child, .footerCredits ul li:last-child").addClass('last');

$(".features li:nth-child(odd)").addClass('odd');
$(".features li:nth-child(even)").addClass('even');

});


/*================================================================*/
/*	BACK TO TOP
/*================================================================*/

$(document).ready(function(){

	// hide .backToTop first
	$(".back-to-top").hide();
	
	// fade in .gototop
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('.back-to-top').fadeIn();
			} else {
				$('.back-to-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('.back-to-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

});


/*================================================================*/
/*	SEARCH DESKTOP
/*================================================================*/
if (document.documentElement.clientWidth >= limit) { //if client width is less than 767px

$(document).ready(function(){

	$('.search input').hide();

	$('.search #search-trigger').click(function(){
    	$(".search input").slideToggle('fast').focus(); 
       	$(this).toggleClass('active');
  	});
    
	$('.search input').blur(function(){
  		$(this).hide('fast');
  	 	$("#search-trigger").removeClass('active');
	});
});

}

/*================================================================*/
/*	SEARCH MOBILE
/*================================================================*/
if (document.documentElement.clientWidth < limit) { //if client width is less than 767px

$(document).ready(function(){

	$('.search input').hide();

$('.search #search-trigger').click(function(){
    
    $(".search input").slideToggle('fast').focus(); 
       $(".preheader .user").hide('fast'); 
       	$(this).toggleClass('active');
  	  });
    
	$('.search input').blur(function(){
  	  $(this).hide('fast');
  	  $("#search-trigger").removeClass('active');
     $('.preheader .user').show('fast'); 
	});
		
});

}

/*================================================================*/
/*	FORGOT PASSWORD (on login page)
/*================================================================*/

$(document).ready(function(){

	$('.forgot-password').hide();

$('.forgotpw, .forgot-password .closeforgot').click(function(){
    
    $(".forgot-password").slideToggle('fast').focus(); 
  	  });
    		
    		
    		
    		
});



/*================================================================*/
/*	SIMPLE ACCORDION
/*================================================================*/

$(document).ready(function(){
    
       $('.s-accordion li.s-wrap div.s-content').hide();
       $('.s-accordion li.s-wrap .trigger a').click(function(){
          if ($(this).hasClass('active')) {
               $(this).removeClass('active');
               $(this).parent().next().slideUp();
          } else {
               $('.s-accordion li.s-wrap .trigger a').removeClass('active');
               $(this).addClass('active');
               $('.s-accordion li.s-wrap div.s-content').slideUp();
               $(this).parent().next().slideDown();
          }
          return false;
       });

});




/*================================================================*/
/*	TOOL TIPS and POP OVERS
/*================================================================*/

  $(function(){

    $('.titletip, ul.social li a, .header .user a').tooltip({});
    $(".detailsPop").popover({trigger: 'hover'});
});

/*================================================================*/
/*	SMOOTH SCROLL to ANCHOR (DIV WITH ID)
/*================================================================*/

$(document).ready(function($) {
 
	$(".scrollto, .mobile-page-nav .btn").click(function(event){		
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);return false;
	});
});


