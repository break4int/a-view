define(['jquery', 'spinner'], function($, spinner) {
	
	$.ajaxSetup({
		headers : {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8'
		},
		cache: false,
		timeout: 3000
	});
	
	spinner.setColor('#ffc000');
	
	return {
		ajax : function(options) {
			
			options.url = 'http://stg.abiyo.co.kr' + '/americano/api' + options.url;
			
			var _beforeSend = options.beforeSend;
			options.beforeSend = function(jqXHR, settings) {
				$.isFunction(_beforeSend) && _beforeSend(jqXHR, settings);
				spinner.show();
			}
			
			var _complete = options.complete;
			options.complete = function(jqXHR, status) {
				spinner.hide();
				$.isFunction(_complete) && _complete(jqXHR, status);
			}
			
			return $.ajax(options);
		}
	};
});