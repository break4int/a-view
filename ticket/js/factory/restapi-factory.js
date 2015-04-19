define(['jquery'], function($) {
	
	var $injector = angular.injector(['ticket']);
	var $config = $injector.get('config');
	var $ticket = $config.ticket;
	var $loansTicketCount = 0;
	var $depositTicketCount = 0;
	var $currentMode = 'deposit';
	
	$ticket.factory('restAPIFactory', ['$resource', '$httpBackend', 'config', function($resource, $httpBackend, $config) {
		var prefix = $config.apiPrefix;
		var ticket = $resource(prefix + '/ticket/:ticketId/:ticketMode',
				{
					ticketId : '@ticketId',
					ticketMode : '@ticketMode'
				},
				{
					'query' : {method:'GET', headers : {'Accept': 'application/json; charset=utf-8', 'Content-Type': 'application/json; charset=utf-8'}}
				}
		);
		
		mockup($config, $httpBackend);
		
		return {
			ticket : ticket
		};
    }]);
	
	var number = 0;
	function mockup($config, $httpBackend) {
		var respondData = {
				mode : "",
				waitCount : 0
		}

		// Mock
//		var $injector = angular.injector(['americano']);
//		var $httpBackend = $injector.get('$httpBackend');

		function matchURI(api, uri) {
			console.log("matchURI1 : " + $config.apiPrefix + api);
			console.log("matchURI2 : " + uri);
			
			if(uri.localeCompare($config.apiPrefix + api)) {
				return true;
			}
			return false;
		}

		
		$httpBackend
		.whenGET(function(uri){
			if(matchURI('/ticket', uri) == true) {
				console.log("whenGET OK");
				respondData.mode = uri.split('/')[4];
				if(respondData.mode == 'deposit')
					respondData.waitCount = ++$depositTicketCount;
				else
					respondData.waitCount = ++$loansTicketCount;
				return true;
			}
			console.log("whenGET FAIL");
			return false;
		}).respond(respondData);
		
		$httpBackend
		.whenGET(function(uri) { return matchURI('/ticket/push', uri); })
		.respond({
			"number"			: "3"
		});
		
	}
	
	return;
});