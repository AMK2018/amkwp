(function() {
	
	function init() {
		var speed = 250,
			easing = mina.easeinout;
		var md = new MobileDetect(window.navigator.userAgent);

		[].slice.call ( document.querySelectorAll( '#pro-grid > a' ) ).forEach( function( el ) {
			var s = Snap( el.querySelector( 'svg' ) ), path = s.select( 'path' ),
				pathConfig = {
					from : path.attr( 'd' ),
					to : el.getAttribute( 'data-path-hover' )
				};

			el.addEventListener( 'mouseenter', function() {
				path.animate( { 'path' : pathConfig.to }, speed, easing );
			} );

			el.addEventListener( 'mouseleave', function() {
				path.animate( { 'path' : pathConfig.from }, speed, easing );
			} );

			window.addEventListener('scroll', function() {
				if(md.is('AndroidOS') || md.is('iPad') || md.is('iOS')){
				   	if($(el).is(':appeared')){
						path.animate( { 'path' : pathConfig.to }, speed, easing );
						$(el+'figcaption h2,' + el+'figcaption p').css('-webkit-transform','translateY(0)');
						$(el+'figcaption h2,' + el+'figcaption p').css('transform','translateY(0)');
						$(el+'figcaption p').css('color','white').css('margin-top','20px');
					}else{
						path.animate( { 'path' : pathConfig.from }, speed, easing );
					}     
				}
			});
		});
	}

	

	init();

})();