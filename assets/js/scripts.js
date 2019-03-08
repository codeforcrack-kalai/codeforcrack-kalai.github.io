/************ CSS Styles ************

    Template Name: Jasmin - Personal Portfolio Template
    Author: kholie-b
    version: 1.0
    Copyright: 2019

************************************/

/*==================================

        Table of Content

        1. Preloader
        2. Navigation
        3. Skills
        4. Statistics
        5. Work
        6. Testimonials
        7. Blog
      
==================================*/

/*global $*/

$(function () {
    
    "use strict";
    var win = $(window),
        navbar = $('.navbar');
   
/*----------------------------------------------------------------
					1. Preloader
----------------------------------------------------------------*/
	$('.preloader').delay(200).fadeOut('slow');
    setTimeout(function() {
    //After 2s, the preloader class of the body will be removed
    $('body').removeClass('preloader');
  }, 500); 
/*----------------------------------------------------------------
					2. Navigation
----------------------------------------------------------------*/
        // navbar scrolling background
    win.on("scroll",function () {

        if ($(this).scrollTop() < 50) {
            $("nav").removeClass("navigation-scroll");
        } else {
            $("nav").addClass("navigation-scroll");
        }
    });
// close navbar-collapse when a  clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });
    
    //smooth scrolling
    $("a.nav-link").on("click", function (event) {
        event.preventDefault();
        var section = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(section).offset().top - 64
        }, 1250);
    });

       
     // Sync Navbar Links With Section
    $('body').scrollspy({
        target: '#navtoggler',
        offset: 75
    });
    // COllapsed menu closed on click
    navbar.on('click', '.navbar-collapse', function (e) {
        if ($(e.target).is('a')) {
            $(this).collapse('hide');
        }
    });

/*----------------------------------------------------------------
					3. Skills
----------------------------------------------------------------*/   
if ($('.chart').length > 0) {
	    $('.chart').easyPieChart({
	      barColor: '#FFEB69',
          trackColor:'#181718',
	      scaleColor:false,
	      easing: 'easeOutBounce',
	      scaleLength: 4,
	      lineCap: 'square',
	      lineWidth:5,
	      size:130,
	      animate: {
	                duration: 2500,
	                enabled: true
	            }
	    });
	  }	
        
/*----------------------------------------------------------------
					4. Statistics
----------------------------------------------------------------*/
    $('.counter').counterUp({
        delay: 300,
        time: 5000
    });
/*----------------------------------------------------------------
					5. Work
----------------------------------------------------------------*/
    /*Work Section Filter*/
    $("#control li").on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    // The Filterizr
    $('#filtr-container').filterizr({
        animationDuration: 0.4
    });
    
 $('.work-inner').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    
/*----------------------------------------------------------------
					6. Testimonials
----------------------------------------------------------------*/
    $(".testimonials .owl-carousel").owlCarousel({
        items: 2,
        autoplay: true,
        smartSpeed: 500,
        margin: 30,
        loop: true,
        autoplayHoverPause: true,
		responsive: {
            0: {
                items: 1
            },
            991: {
                items: 2
            }
        }
    });
    
/*----------------------------------------------------------------
					7. Blog
----------------------------------------------------------------*/
    $('.blog .owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            991: {
                items: 2
            }
        }
    });

});