function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}
/*if (isIE()) {
 alert('IE');
}*/

/*function PopIt() {
	var exit_pop_autoclick;
	if( typeof exit_pop_autoclick === 'undefined' ) {
		exit_pop_autoclick = false;
	}

	if(exit_pop_autoclick) {
		setTimeout(function(){exit_pop_do_autoclick();},50);
	}

	if(!window.chrome && !isIE()) {
		alert(exit_pop_alert_text);
	}

	if(!exit_pop_autoclick) {
		jQuery('.CS_black_overlay, .CS_pop_div').show();
	}

	return exit_pop_alert_text;
}*/
function PopIt() { 
		//$("a.trigger").trigger('click');
		/*window.onbeforeunload = UnPopIt;
		jQuery('.CS_black_overlay, .CS_pop_div').show();*/		
		setTimeout(function(){exit_pop_do_autoclick();},400);
		return exit_pop_alert_text; 
}

/*function exit_pop_do_autoclick() {
	window.onbeforeunload = UnPopIt;
	window.location = jQuery(".CS_pop_div a").attr('href');
}*/
function exit_pop_do_autoclick() {
	window.onbeforeunload = UnPopIt;
	//jQuery('.CS_black_overlay, .CS_pop_div').show();
	setPromo();
}

function UnPopIt()  {  }

jQuery(document).ready(function() {
	window.onbeforeunload = PopIt;
	jQuery("a").click(function(){ window.onbeforeunload = UnPopIt; });
	jQuery("input[type=submit]").click(function(){ window.onbeforeunload = UnPopIt; });
	jQuery("button[type=submit]").click(function(){ window.onbeforeunload = UnPopIt; });
	jQuery("input[type=button]").click(function(){ window.onbeforeunload = UnPopIt; });
	jQuery("input[type=image]").click(function(){ window.onbeforeunload = UnPopIt; });
	jQuery("form").submit(function(){ window.onbeforeunload = UnPopIt; });
	jQuery("input").submit(function(){ window.onbeforeunload = UnPopIt; });
	
	/*jQuery(".CS_black_overlay").click(function() {
		window.onbeforeunload = UnPopIt;
		window.location = jQuery(".CS_pop_div a").attr('href');
	});*/
});