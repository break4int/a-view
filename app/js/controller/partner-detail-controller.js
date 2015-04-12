define(['jquery', 'angular'], function($, angular) {
	
	var $injector = angular.injector(['americano']);
	var $config = $injector.get('config');
	var $americano = $config.americano;
	var $v_element = null;
	var v_restAPIFactory = null;
	var v_scope = null;
	
	$americano.controller('partnerDetailController', ['$scope', '$element', '$http', '$resource', 'restAPIFactory', function($scope, $element, $http, $resource, restAPIFactory) {
		$v_element = $element;
		v_restAPIFactory = restAPIFactory;
		v_scope = $scope;
		
//		if(v_partnerId !=null){
//			console.log("on:"+v_partnerId);
//			restAPIFactory.partner.get({
//				partnerId : v_partnerId
//			}, function(partner) {
//				$scope.partner = partner;
//			}, function(error) {
//				console.log(error);
//			});
//		}
		
		
//		var partner1 = restAPIFactory.partnerDetail1.get();
//		console.log(partner1);
		
		
//		var result = restAPIFactory.msgs.query();
//		console.log("==>"+result);
//		$scope.jsonmsg=result;
////		
//		$http({
//    		method: 'GET', //방식
//    		url: './json/partnerDetail.json',
//    		headers: {'Content-Type': 'application/json; charset=utf-8'}
//    	})
//    	.success(function(data, status, headers, config) {
//    		if( data ) {
//    			console.log('partnerDetail success data');
//    			$scope.partner = data;
//    		}
//    		else {
//    			console.log('fail data');
//    		}
//    	})
//    	.error(function(data, status, headers, config) {
//    		console.log(status);
//    	});
    }]);
	
	return {
		show : function(id) {
				console.log("deatil partnerId:"+id);
				
				var $injector = angular.injector(['americano']);
				var $config = $injector.get('config');
				
				if ($config.currentView != null) {
					$($config.currentView).hide();
				}
				
				
				$config.currentView = $v_element;
				$($v_element).show();
			
				v_restAPIFactory.partner.get({
					partnerId : 1
				}, function(partner) {
					v_scope.partner = partner;
				}, function(error) {
					console.log(error);
				});
		}
	}
});