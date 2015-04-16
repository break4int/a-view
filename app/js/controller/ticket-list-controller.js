define(['jquery', 'angular'], function($, angular) {
	
	var $injector = angular.injector(['americano']);
	var $global = $injector.get('global');
	var $americano = $global.$americano;
	var $v_element = null;
	
	$americano.controller('ticketListController', ['$scope', '$element', '$http', 'restAPIFactory', function($scope, $element, $http, restAPIFactory) {
		$v_element = $element;
		
		restAPIFactory.ticket.query({
		}, function(ticketList) {
			
			$scope.ticketList = ticketList;
		}, function(error) {
			console.log(error);
		});
		
		restAPIFactory.ticket.get({
			ticketId : 1
		}, function(ticket) {
			$scope.ticket = ticket;
		}, function(error) {
			console.log(error);
		});

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