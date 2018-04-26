var cbpHorizontalMenu=(function()
{
	var b=$(".topheader .menu >li"),
	g=b.children("a"),c=$("body"),
	d=-1;function f(){g.on("click",a);
	b.on("click",function(h)
	{
		h.stopPropagation()})
}
function a(j){
	if(d!==-1){
		b.eq(d).removeClass("cbp-hropen")
	}
	var i=$(
		j.currentTarget).parent("li"),
		h=i.index();if(d===h){
		i.removeClass("cbp-hropen");
		d=-1
	}
	else{
		i.addClass("cbp-hropen");
		d=h;
		c.off("click").on("click",e)
	}
	return false
}function e(h){b.eq(d).removeClass("cbp-hropen");d=-1}return{init:f}})();
var slider=(function(){
	var demo1 = $("#slider1").slippry({
		transition: 'fade',
		usecss: true,
		speed: 1000,
		pause: 3000,
		auto: true,
		preload: 'visible',
		autoHover: false
	});
	$('.init').click(function () {
		demo1 = $("#slider1").slippry();
		return false;
	});
});


/*global $ */
$(document).ready(function () {
	
		"use strict";
	
		$('.menu-home > ul > li:has( > ul)').addClass('menu-dropdown-icon');
		//Checks if li has sub (ul) and adds class for toggle icon - just an UI
	
	
		$('.menu-home > ul > li > ul:not(:has(ul))').addClass('normal-sub');
		//Checks if drodown menu's li elements have anothere level (ul), if not the dropdown is shown as regular dropdown, not a mega menu (thanks Luka Kladaric)
	
	
		//Adds menu-mobile class (for mobile toggle menu) before the normal menu
		//Mobile menu is hidden if width is more then 959px, but normal menu is displayed
		//Normal menu is hidden if width is below 959px, and jquery adds mobile menu
		//Done this way so it can be used with wordpress without any trouble
	
		$(".menu-home > ul > li").hover(
			function (e) {
				if ($(window).width() > 943) {
					$(this).children("ul").fadeIn(150);
					e.preventDefault();
					$("#menu-container #menuright >li").children("ul").fadeOut(150);
					e.preventDefault();
					$("#menu-container #menuright .search").children("ul").fadeOut(150);
					e.preventDefault();
				}
			}, function (e) {
				if ($(window).width() > 943) {
					$(this).children("ul").fadeOut(150);
					e.preventDefault();
				}
			}
		);

		//If width is more than 943px dropdowns are displayed on hover
		$(".menu-home > ul > li").click(function() {
			if ($(window).width() < 943) {
			  $(this).children("ul").fadeToggle(150);
			  $("#menu-container #menuright >li").children("ul").fadeOut(150);
			  e.preventDefault();
			}
		});
		
		$("#menu-container #menuright .search").hover(
			function (e) {
					$(this).children("ul").fadeIn(150);
					e.preventDefault();
					$(".menu-container .menuright >li").children("ul").fadeOut(150);
					e.preventDefault();
					$(".menu-home > ul > li").children("ul").fadeOut(150);
					e.preventDefault();
			}, function (e) {
					$(this).children("ul").fadeOut(150);
					e.preventDefault();
			}
		);
		$("#menu-container #menuright .cart").hover(
			function (e) {
					$(this).children("ul").fadeIn(150);
					e.preventDefault();
					$(".menu-container .menuright >li").children("ul").fadeOut(150);
					e.preventDefault();
					$(".menu-home > ul > li").children("ul").fadeOut(150);
					e.preventDefault();
					$(".menu-container .menuright .search").children("ul").fadeOut(150);
					e.preventDefault();
			}, function (e) {
					$(this).children("ul").fadeOut(150);
					e.preventDefault();
			}
		);
		$("#menu-container #menuright >li").click(function() {
			$(this).children("ul").fadeToggle(150);
			$(".menu-container .menuright .search").children("ul").fadeOut(150);
			e.preventDefault();
			$(".menu-container .menuright .cart").children("ul").fadeOut(150);
			e.preventDefault();
	  });
		//If width is less or equal to 943px dropdowns are displayed on click (thanks Aman Jain from stackoverflow)
	

		//when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story (thanks mwl from stackoverflow)
	
	});
	
