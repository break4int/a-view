define(['jquery', 'spinner'], function($, spinner) {
	
	$.ajaxSetup({
		headers : {
			'X-Auth-Type': 'fingerprint',
//			'X-Auth-Token': '',
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8'
		},
		cache: false,
		timeout: 3000
	});
	
	spinner.setColor('#ffc000');
	
	var $injector = angular.injector(['americano']);
	var $config = $injector.get('config');
	
	return {
		ajax : function(options) {
			
			options.url = $config.BASE_URL + options.url;
			options.headers = {
					'X-Auth-Token': localStorage.getItem('fingerprint')
			}
			
			var _beforeSend = options.beforeSend;
			options.beforeSend = function(jqXHR, settings) {
				$.isFunction(_beforeSend) && _beforeSend(jqXHR, settings);
				spinner.show();
			}
			
			var _error = options.error;
			options.error = function(jqXHR, status, error) {
				console.log(jqXHR);
				console.log(status);
				console.log(error);
				$.isFunction(_error) && _error(jqXHR, status, error);
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