/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 0);
			});

		// Touch mode.
			if (skel.vars.mobile)
				$body.addClass('is-touch');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly({
				speed: 2000
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				alignment: 'right',
				hideDelay: 350
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Parallax.
		// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
			if (skel.vars.browser == 'ie'
			||	skel.vars.mobile) {

				$.fn._parallax = function() {

					return $(this);

				};

			}
			else {

				$.fn._parallax = function() {

					$(this).each(function() {

						var $this = $(this),
							on, off;

						on = function() {

							$this
								.css('background-position', 'center 0px');

							$window
								.on('scroll._parallax', function() {

									var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

									$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

								});

						};

						off = function() {

							$this
								.css('background-position', '');

							$window
								.off('scroll._parallax');

						};

						skel.on('change', function() {

							if (skel.breakpoint('medium').active)
								(off)();
							else
								(on)();

						});

					});

					return $(this);

				};

				$window
					.on('load resize', function() {
						$window.trigger('scroll');
					});

			}

		// Spotlights.
			var $spotlights = $('.spotlight');

			$spotlights
				._parallax()
				.each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						// Use main <img>'s src as this spotlight's background.
							$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

						// Enable transitions (if supported).
							if (skel.canUse('transition')) {

								var top, bottom, mode;

								// Side-specific scrollex tweaks.
									if ($this.hasClass('top')) {

										mode = 'top';
										top = '-20%';
										bottom = 0;

									}
									else if ($this.hasClass('bottom')) {

										mode = 'bottom-only';
										top = 0;
										bottom = '20%';

									}
									else {

										mode = 'middle';
										top = 0;
										bottom = 0;

									}

								// Add scrollex.
									$this.scrollex({
										mode:		mode,
										top:		top,
										bottom:		bottom,
										initialize:	function(t) { $this.addClass('inactive'); },
										terminate:	function(t) { $this.removeClass('inactive'); },
										enter:		function(t) { $this.removeClass('inactive'); },

										// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

										leave:	function(t) { $this.addClass('inactive'); }

									});

							}

					};

					off = function() {

						// Clear spotlight's background.
							$this.css('background-image', '');

						// Disable transitions (if supported).
							if (skel.canUse('transition')) {

								// Remove scrollex.
									$this.unscrollex();

							}

					};

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});
			
			var objects = $(".obj");
			var $video = $('video');

			objects._parallax().each(function(){
				var $this = $(this),
						on, off;
				
				on = function () {

					if (skel.canUse('transition')) {

						var top, bottom, mode;

						// Side-specific scrollex tweaks.
							if ($this.hasClass('top')) {

								mode = 'top';
								top = '-20%';
								bottom = 0;

							}
							else if ($this.hasClass('bottom')) {

								mode = 'bottom-only';
								top = 0;
								bottom = '20%';

							}
							else {

								mode = 'middle';
								top = 0;
								bottom = 0;

							}

						// Add scrollex.
							$this.scrollex({
								mode:		mode,
								top:		top,
								bottom:		bottom,
								initialize:	function(t) { 
									$this.addClass('inactive'); 
									$video[0].pause();
								},
								terminate:	function(t) { 
									$this.removeClass('inactive'); 
									$video[0].play();
								},
								enter:		function(t) { 
									$this.removeClass('inactive'); 
									$video[0].play();
								},

								// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

								leave:	function(t) { 
									$this.addClass('inactive');
									$video[0].pause();
								}

							});

					}
				};

				off = function(){
					if (skel.canUse('transition')) {

						// Remove scrollex.
							$this.unscrollex();
					}
				};

				skel.on('change', function(){
					if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();
				});
			});
		// Wrappers.
			var $wrappers = $('.wrapper');

			$wrappers
				.each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						if (skel.canUse('transition')) {

							$this.scrollex({
								top:		250,
								bottom:		0,
								initialize:	function(t) { $this.addClass('inactive'); },
								terminate:	function(t) { $this.removeClass('inactive'); },
								enter:		function(t) { $this.removeClass('inactive'); },

								// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

								leave:	function(t) { $this.addClass('inactive'); },

							});

						}

					};

					off = function() {

						if (skel.canUse('transition'))
							$this.unscrollex();

					};

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});

		// Banner.
			var $banner = $('#banner');

			$banner
				._parallax();

		$(".tab-content").hide();
		$(".tab-content").first().show();

		$("ul.tabs li").click(function () {
		   $("ul.tabs li").removeClass("active");
		   $(this).addClass("active");
		   $(".tab-content").hide();
		   var activeTab = $(this).attr("data-id");
		   $("#" + activeTab).fadeIn(700);
		});

		$(".dropotron li a").click(function () {
		   $("ul.tabs li").removeClass("active");
		   $(".tab-content").hide();
		   var activeTab = $(this).parent().attr("data-id");
		   $("ul.tabs li:nth-child(3)").addClass("active");
		   $("#" + activeTab).fadeIn(700);
		});

		// Example MailChimp url: http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
	var mailChimpURL = 'http://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e65110b38d'

	$('#mc-form').ajaxChimp({

		language: 'es',
	   url: mailChimpURL

	});

		$.ajaxChimp.translations.es = {
		   'submit': 'Grabación en curso...',
		    0: 'Te hemos enviado un email de confirmación',
		    1: 'Por favor, introduzca un valor',
		    2: 'Una dirección de correo electrónico debe contener una sola @',
		    3: 'La parte de dominio de la dirección de correo electrónico no es válida (la parte después de la @:)',
		    4: 'La parte de usuario de la dirección de correo electrónico no es válida (la parte antes de la @:)',
		    5: 'Esta dirección de correo electrónico se ve falso o no es válido.'
		}
		

		$("#form-submit-mes").off("click").on("click", function(){
			$("#contactForm").submit();
		});

		$('#contactForm').validate({

			/* submit via ajax */
			submitHandler: function(form) {

				var sLoader = $('#submit-loader');

				$.ajax({      	

			      type: "POST",
			      url: "assets/inc/sendEmail.php",
			      data: $(form).serialize(),
			      beforeSend: function() { 

			      	sLoader.fadeIn(); 

			      },
			      success: function(msg) {

		            // Message was sent
		            if (msg == 'OK') {
		            	sLoader.fadeOut(); 
		               $('#message-warning').hide();
		               $('#contactForm').fadeOut();
		               $('#message-success').fadeIn(); 
		               	setTimeout(function() {
		                	$('#message-warning').fadeOut();
		                }, 3000);  
		            }
		            // There was an error
		            else {
		            	sLoader.fadeOut(); 
		               $('#message-warning').html(msg);
			            $('#message-warning').fadeIn();
			            setTimeout(function() {
		                	$('#message-warning').fadeOut();
		                }, 3000);  
		            }

			      },
			      error: function() {

			      	sLoader.fadeOut(); 
			      	$('#message-warning').html("Algo salio mal, Intenta de nuevo.");
			        $('#message-warning').fadeIn();
			        setTimeout(function() {
	                	$('#message-warning').fadeOut();
	                }, 3000);  
			      }

		      });     		
	  		}

		});

		$("#btnVideo").off("click").on("click", function(){
			$(".left-column > *").hide();
			$(".left-column video").fadeIn(700);
			
			$('.left-column video').focus();
			$('.left-column video').click();

		});

		$(".pro-grid a").off("click").on("click", function(){
			var dataid = $(this).attr("data-id");
			switch(dataid){
				case "proyecto_1":
					lee_json(dataid);
				break;
				case "proyecto_2":
					lee_json(dataid);
				break;
			}
		});

		 function lee_json(proyecto) {
            $.getJSON("../assets/proyectos/"+proyecto+"/conf.json", function(data) {
            	var array = data["Proyecto"][0];
                localStorage.setItem("json", JSON.stringify(array));
                window.location.href="details.html";
            });
        }
	});

})(jQuery);