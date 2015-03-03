jQuery(document).ready(function() {
	jQuery('#user-check').on('shown', function () {
		setTimeout(function(){
			jQuery('#user-check-location').append('Accepted.');
	    }, 1000);
		setTimeout(function(){
			jQuery('#user-check-availablility').removeClass('hidden');
	    }, 2000);
		setTimeout(function(){
			jQuery('#user-check-outcome').removeClass('hidden');
			jQuery('.modal-footer').removeClass('hidden');
	    }, 3000);
		jQuery('#user-check-prgress-bar .bar').animate({
			width: '100%',
		}, 3000);
	});
	jQuery('#user-check').modal('show');
	
	jQuery('.envoke-popdown').popover({
		placement:'bottom',
		trigger:'hover',
	});
	
	jQuery('.envoke-tooltip').tooltip();
		
	jQuery('#nav-timeremaining').countdown({
		until:+900,
		format: 'HMS',
		layout: '{mnn}:{snn}',
		expiryText:'Expired!',
	});
	
	jQuery('#user-process').on('shown', function () {

		carouselLoad(); 
		
		jQuery('#user-check-bar .bar').animate({
			width: '50%',
		}, 3000);
		setTimeout(function(){
			jQuery('#quiz-form-final').submit();
		}, 7000);
		
		
	});
		

	jQuery('#question-submit.final').click(function(event) {
		event.preventDefault();
		jQuery('#user-process').modal('show');
	});

    jQuery('.modal-popup .popup-close-btn').click(function(event) {
        jQuery('.modal-popup').hide();
        jQuery('.modal-backdrop').hide();
    });

    jQuery('.js-player').jPlayer({
        ready: function () {
            jQuery(this).jPlayer('setMedia', {
                mp3: 'audio/uk.mp3'
            }).jPlayer('play');
        },
        swfPath: 'js/vendors/jplayer',
        supplied: 'mp3',
        cssSelectorAncestor: '',
        cssSelector: {
            play: '.js-play',
            pause: '.js-pause',
            playBar: '.js-play-bar',
            noSolution: '.js-no-solution'
        }
    });
});

/**
 * PeriodicalUpdater - jQuery plugin for timed, decaying ajax calls
 *
 * http://www.360innovate.co.uk
 *
 * Copyright (c) 2009 360innovate (http://www.360innovate.co.uk)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 1.0
 */

(function($) {
    $.PeriodicalUpdater = function(options, callback){

        settings = jQuery.extend({
            url: '',                // URL of ajax request
            method: 'get',          // method; get or post
            sendData: '',           // array of values to be passed to the page - e.g. {name: "John", greeting: "hello"}
            minTimeout: 1000,       // starting value for the timeout in milliseconds
            maxTimeout: 8000,       // maximum length of time between requests
            multiplier: 2,          // if set to 2, timerInterval will double each time the response hasn't changed (up to maxTimeout)
            type: 'text'            // response type - text, xml, json etc - as with $.get or $.post
        }, options);
        
        // should we be GETting or POSTing the URL?
        f = settings.method == 'post' || settings.method == 'POST' ? $.post : $.get;

        // you really, really don't want multipliers of less than 1 - it will cause lots of strain on the server!
        settings.multiplier = settings.multiplier < 1 ? 1:settings.multiplier;
        
        // set some initial values, then begin
        var prevContent;
        var timerInterval = settings.minTimeout;
        getdata();
        
        function getdata()
        {
            f(settings.url, settings.sendData, function(d){
                if(prevContent != d)
                {
                    // content has changed
                    prevContent = d;
                    if(callback)
                    {
                        callback(d);
                    }
                    
                    // recursive call to getdata(). You can stop ajax requests from this plugin by calling clearTimeout(PeriodicalTimer);
                    // (on a button click, for example)
                    PeriodicalTimer = setTimeout(getdata, settings.minTimeout);
                }else{
                    // content hasn't changed - re-calculate timers and recursively call getdata() again
                    if(timerInterval < settings.maxTimeout)
                    {
                        timerInterval = timerInterval * settings.multiplier;
                    }
                    
                    if(timerInterval > settings.maxTimeout)
                    {
                        timerInterval = settings.maxTimeout;
                    }
                    
                    PeriodicalTimer = setTimeout(getdata, timerInterval);
                }
            }, settings.type) 
        }
    };  
})(jQuery);