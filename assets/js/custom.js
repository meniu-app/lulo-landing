(function ($) {
	"use strict";

	$('.owl-carousel').owlCarousel({
		loop: true,
		margin: 30,
		nav: true,
		pagination: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			1000: {
				items: 2
			}
		}
	})


	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		var box = $('.header-text').height();
		var header = $('header').height();

		if (scroll >= box - header) {
			$("header").addClass("background-header");
		} else {
			$("header").removeClass("background-header");
		}
	});

	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();


	// Menu Dropdown Toggle
	if ($('.menu-trigger').length) {
		$(".menu-trigger").on('click', function () {
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}

	// Join Now button click handler
	// if ($('.join-now').length) {
	// 	$(".join-now").on('click', function () {
	// 		$(".join-now-modal-wrapper").toggleClass('show');
	// 		$(".join-now-modal-wrapper-overlay").toggleClass('show');
	// 		console.log('Join Now button clicked');
	// 	});
	// }

	// Join Now overlay click handler
	// if ($('.join-now-modal-wrapper-overlay').length) {
	// 	$(".join-now-modal-wrapper-overlay").on('click', function () {
	// 		$(this).toggleClass('show');
	// 		$(".join-now-modal-wrapper").toggleClass('show');
	// 		console.log('Join Now overlay clicked');
	// 	});
	// }

	// Join Now overlay click handler
	// if ($('.close-modal').length) {
	// 	$(".close-modal").on('click', function () {
	// 		$(".join-now-modal-wrapper").toggleClass('show');
	// 		$(".join-now-modal-wrapper-overlay").toggleClass('show');
	// 	});
	// }

	// $("#businessName").focus(function () {
	// 	$("#labelBusinessName").toggleClass('active');
	// 	console.log('businessName focus');
	// }).blur(function () {
	// 	$("#labelBusinessName").toggleClass('active');
	// 	console.log('businessName blur');
	// });

	// function onSuccess(response) {
	// 	console.log('onSuccess response', response);
	// }
	//
	// function onError(error) {
	// 	console.log('onError error', error);
	// }

	// Create Store button click handler
	// $("#createStoreButton").on('click', function () {
	// 	const businessName = document.getElementById('businessName').value;
	// 	const businessAddress = document.getElementById('businessAddress').value;
	// 	const email = document.getElementById('email').value;
	// 	const phoneNumber = document.getElementById('phoneNumber').value;
	// 	const data = {
	// 		businessName: businessName,
	// 		businessAddress: businessAddress,
	// 		email: email,
	// 		phoneNumber: phoneNumber,
	// 	};
	// 	// console.log('data', data);
	//
	// 	$.ajax({
	// 		type: "POST",
	// 		url: "http://lulo-server-dev.herokuapp.com/api/v1/register",
	// 		data: JSON.stringify({ email: email, password: email }),
	// 		success: onSuccess,
	// 		error: onError,
	// 		contentType: "application/json; charset=utf-8",
	// 		dataType: "json",
	// 	});
	// });

	// Menu elevator animation
	$('a[href*=\\#]:not([href=\\#])').on('click', function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var targetHash = this.hash;
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				var width = $(window).width();
				if (width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);
				}
				$('html,body').animate({
					scrollTop: (target.offset().top)
				}, 700, 'swing', function () {
					window.location.hash = targetHash;
				});
				return false;
			}
		}
	});

	$(document).ready(function () {
		$('a[href^="#welcome"]').addClass('active');

		//smoothscroll
		$('.menu-item').on('click', function (e) {
			const shouldPreventDefault = e && e.target && e.target.href.indexOf('#') !== -1;
			if (shouldPreventDefault) {
				e.preventDefault();
			}
			var athis = this;
			var target = this.hash,
				menu = target;
			var $target = $(target);

			$('html, body').stop().animate({
				'scrollTop': $target && $target.offset() ? $target.offset().top : 0
			}, 500, 'swing', function () {
				window.location.hash = target;
				$('.menu-item').removeClass('active');
				$(athis).addClass('active');
			});
		});

		$(window).scroll(function (event) {
			var scrollPos = $(document).scrollTop() + 80;

			if (scrollPos === 0) {
				$('a[href^="#welcome"]').addClass('active');
				return;
			}
			$('.menu-item').not('[href=""]').not('[href="mailto:hello@oklulo.com"]').not('[href="https://dashboard.oklulo.com/"]').not('[href="javascript:;"]').each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));

				if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
					$('.menu-item').removeClass("active");
					currLink.addClass("active");
				} else {
					currLink.removeClass("active");
				}
			});
		})
	});

	const Accordion = {
		settings: {
			// Expand the first item by default
			first_expanded: false,
			// Allow items to be toggled independently
			toggle: false
		},

		openAccordion: function (toggle, content) {
			if (content.children.length) {
				toggle.classList.add("is-open");
				let final_height = Math.floor(content.children[0].offsetHeight);
				content.style.height = final_height + "px";
			}
		},

		closeAccordion: function (toggle, content) {
			toggle.classList.remove("is-open");
			content.style.height = 0;
		},

		init: function (el) {
			const _this = this;

			// Override default settings with classes
			let is_first_expanded = _this.settings.first_expanded;
			if (el.classList.contains("is-first-expanded")) is_first_expanded = true;
			let is_toggle = _this.settings.toggle;
			if (el.classList.contains("is-toggle")) is_toggle = true;

			// Loop through the accordion's sections and set up the click behavior
			const sections = el.getElementsByClassName("accordion");
			const all_toggles = el.getElementsByClassName("accordion-head");
			const all_contents = el.getElementsByClassName("accordion-body");
			for (let i = 0; i < sections.length; i++) {
				const section = sections[i];
				const toggle = all_toggles[i];
				const content = all_contents[i];

				// Click behavior
				toggle.addEventListener("click", function (e) {
					if (!is_toggle) {
						// Hide all content areas first
						for (let a = 0; a < all_contents.length; a++) {
							_this.closeAccordion(all_toggles[a], all_contents[a]);
						}

						// Expand the clicked item
						_this.openAccordion(toggle, content);
					} else {
						// Toggle the clicked item
						if (toggle.classList.contains("is-open")) {
							_this.closeAccordion(toggle, content);
						} else {
							_this.openAccordion(toggle, content);
						}
					}
				});

				// Expand the first item
				if (i === 0 && is_first_expanded) {
					_this.openAccordion(toggle, content);
				}
			}
		}
	};

	(function () {
		// Initiate all instances on the page
		const accordions = document.getElementsByClassName("accordions");
		for (let i = 0; i < accordions.length; i++) {
			Accordion.init(accordions[i]);
		}
	})();



	// Home seperator
	if ($('.home-seperator').length) {
		$('.home-seperator .left-item, .home-seperator .right-item').imgfix();
	}


	// Home number counterup
	if ($('.count-item').length) {
		$('.count-item strong').counterUp({
			delay: 10,
			time: 1000
		});
	}


	// Page loading animation
	$(window).on('load', function () {
		if ($('.cover').length) {
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function () {
			setTimeout(function () {
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function () {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		// $('.submenu').on('click', function () {
		// 	if (width < 992) {
		// 		$('.submenu ul').removeClass('active');
		// 		$(this).find('ul').toggleClass('active');
		// 	}
		// });
	}


})(window.jQuery);
