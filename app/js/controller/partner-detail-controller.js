define(['jquery', 'angular', 'serverBridge'], function($, angular, serverBridge) {
	
	var $injector = angular.injector(['americano']);
	var $global = $injector.get('global');
	var $americano = $global.$americano;
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
				var $global = $injector.get('global');
				
				if ($global.currentView != null) {
					$($global.currentView).hide();
				}
				
				
				$global.currentView = $v_element;
				$($v_element).show();
			
				serverBridge.ajax({
					url: '/partner/' + id,
					success:function(data, status, jqXHR) {
						console.log(data[0]);
						v_scope.$apply(function(){
							v_scope.partner = data[0];
						});
						holder.run();
					},
					error: function(jqXHR, status, error) {
						console.log(jqXHR);
					}
				});
				
//				v_restAPIFactory.partner.get({
//					partnerId : 1
//				}, function(partner) {
//					v_scope.partner = partner;
//				}, function(error) {
//					console.log(error);
//				});
		}
	}
});