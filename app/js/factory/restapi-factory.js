define(['jquery', 'angular'], function($, angular) {
	
	var $injector = angular.injector(['americano']);
	var $global = $injector.get('global');
	var config = $injector.get('config');
	var $americano = $global.$americano;
	
	$americano.factory('restAPIFactory', ['$resource', 'config', function($resource, config) {

		var baseUrl = config.BASE_URL;
		
		var partner = $resource(baseUrl + '/partner/:partnerId',
				{
					lon : '@lon',
					lat : '@lat',
					partnerId : '@partnerId'
				},
				{
//					// 기본 액션
//					'get' : {method:'GET'},
//					'save' : {method:'POST'},
//					'query' : {method:'GET', isArray:true},
//					'remove' : {method:'DELETE'},
//					'delete' : {method:'DELETE'}
					
					'query' : {method:'GET', isArray:true, headers : {'Accept': 'application/json; charset=utf-8', 'Content-Type': 'application/json; charset=utf-8'}}
				}
		);
		
		var ticket = $resource(baseUrl + '/ticket/:ticketId',
				{
					ticketId : '@ticketId'
				},
				{
					'query' : {method:'GET', isArray:true, headers : {'Accept': 'application/json; charset=utf-8', 'Content-Type': 'application/json; charset=utf-8'}}
				}
		);
		
		
		// mockup($global, $httpBackend);
		
		return {
			partner : partner,
			ticket : ticket
		}
    }]);
	
	function mockup($global, $httpBackend) {
		
		// Mock
//		var $injector = angular.injector(['americano']);
//		var $httpBackend = $injector.get('$httpBackend');

		function matchURI(api, uri) {
			
			if (config.BASE_URL + api == uri.split('?')[0]) {
				return true;
			}
			return false;
		}
		
		$httpBackend
		.whenGET(function(uri) { return matchURI('/partner', uri); })
		.respond(function(method, url, data) {
			
			var array = [];
			
			for (var i = 0, iMax = 5 ; i < iMax ; i++) {
				
				array.push({
					id : i,
					name : ('토다이' + i),
					imageUrl : './image/avatar04.png',
					telephone : '02-0000-0000',
					operatingHour : '10-22',
					description : 'AAA',
					menu : '-----',
					menuImageUrl : './image/avatar04.png',
					place : '정자동',
					waitCount : (Math.floor(Math.random() * 15) + 1)
				});
			}
			
			return [200, array, {}];
		});
		
		$httpBackend
		.whenGET(function(uri) { return matchURI('/partner/1', uri); })
		.respond({
			"id"			: "1",
			"name"		: "아웃백1",
			"imageUrl"		: "./image/avatar04.png",
			"telephone"			: "02-0000-0000",
			"operatingHour"		: "10~22",
			"description"			: "아웃백 스테이크 하우스1",
			"menu"				: "서로인",
			"menuImageUrl"		: "./image/avatar04.png",
			"waitCount"			: "100000"
		});
		$httpBackend
		.whenGET(function(uri) { return matchURI('/ticket/1', uri); })
		.respond({
			"id"					: "5",
			"partnerId"			: "p3",
			"partnerName"		: "앗백",
			"orderNumber"		: "721",
			"orderType"			: "2",
			"nowNumber"		: "719"
		});
		$httpBackend
		.whenGET(function(uri) { return matchURI('/ticket/0', uri); })
		.respond({
			"id"					: "5",
			"partnerId"			: "p3",
			"partnerName"		: "앗백",
			"orderNumber"		: "721",
			"orderType"			: "2",
			"nowNumber"		: "719"
		});
		
		$httpBackend
		.whenGET(function(uri) { return matchURI('/ticket', uri); })
		.respond([
	      	{
	    		"id"					: "4",
	    		"partnerId"			: "p3",
	    		"partnerName"		: "test3",
	    		"waitingTime"		: "45",
	    		"date"					: "2015-02-10 18:40:30"
	    	},
	    	{
	    		"id"					: "3",
	    		"partnerId"			: "p32",
	    		"partnerName"		: "test2",
	    		"waitingTime"		: "100",
	    		"date"					: "2015-02-09 20:00:30"
	    	},
	    	{
	    		"id"					: "2",
	    		"partnerId"			: "p1",
	    		"partnerName"		: "test1",
	    		"waitingTime"		: "20",
	    		"date"					: "2015-02-08 13:15:30"
	    	},
	    	{
	    		"id"					: "1",
	    		"partnerId"			: "p5",
	    		"partnerName"		: "test5",
	    		"waitingTime"		: "10",
	    		"date"					: "2015-02-5 09:20:30"
	    	}]
	    );
	}
	
	return;
});