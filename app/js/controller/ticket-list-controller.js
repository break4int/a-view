define(['jquery', 'angular', 'serverBridge'], function($, angular, serverBridge) {
	
	var $injector = angular.injector(['americano']);
	var $global = $injector.get('global');
	var $americano = $global.$americano;
	var $v_element = null;
	
	$americano.controller('ticketListController', ['$scope', '$element', '$http', 'restAPIFactory', function($scope, $element, $http, restAPIFactory) {
		$v_element = $element;
		
		serverBridge.ajax({
			url: '/ticket',
			type: 'GET',
			success: function(data, status, jqXHR) {
				
			},
			complete: function() {
				$scope.$apply(function(){
				    $scope.ticketList = [
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
		        	    	}
				    ];
				});
			}
		});
		
		serverBridge.ajax({
			url: '/ticket/' + 1,
			type: 'GET',
			success: function(data, status, jqXHR) {
				
			},
			complete: function() {
				$scope.$apply(function(){
				    $scope.ticket = {
						"id"					: "5",
						"partnerId"			: "p3",
						"partnerName"		: "앗백",
						"orderNumber"		: "721",
						"orderType"			: "2",
						"nowNumber"		: "719"
					};
				});
			}
		});
		
//		restAPIFactory.ticket.query({
//		}, function(ticketList) {
//			
//			$scope.ticketList = ticketList;
//		}, function(error) {
//			console.log(error);
//		});
//		
//		restAPIFactory.ticket.get({
//			ticketId : 1
//		}, function(ticket) {
//			$scope.ticket = ticket;
//		}, function(error) {
//			console.log(error);
//		});

//		$scope.refreshNowNumber = function(partnerId, orderType) {
//			$http({
//        		method: 'GET',
//        		url: './json/nowNumber.json',
//        		headers: {'Content-Type': 'application/json; charset=utf-8'}
//        	})
//        	.success(function(data, status, headers, config) {
//        		if( data ) {
//        			//console.log('nowNumber success data');
//        			$scope.data = data;
//        			$("#nowNumber").text(data.nowNumber);
//        		}
//        		else {
//        			console.log('fail data');
//        		}
//        	})
//        	.error(function(data, status, headers, config) {
//        		console.log(status);
//        	});
		//}
    }]);
	
	return {
		show : function() {
			
			var $injector = angular.injector(['americano']);
			var $global = $injector.get('global');
			
			if ($global.currentView != null) {
				$($global.currentView).hide();
			}
			
			$global.currentView = $v_element;
			$($v_element).show();
		}
	}
});