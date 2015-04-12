define(['jquery', 'angular', 'router', 'holder'], function($, angular, router, holder) {
	
	var $injector = angular.injector(['americano']);
	var $config = $injector.get('config');
	var $americano = $config.americano;
	var $v_element = null;
	
	
	$americano.directive('partnerRepeatDirective', function() {
		return function(scope, element, attrs) {
//			angular.element(element).css('color','blue');
			if (scope.$last){
				holder.run();
				window.holder = holder;
			}
		};
	});
	
	$americano.controller('partnerListController', ['$scope', '$element', 'restAPIFactory', function($scope, $element, restAPIFactory) {

		$v_element = $element;
		
		restAPIFactory.partner.query({
			lon : 12.345,
			lat : 38.545
		}, function(partnerList) {
			
			$scope.array = partnerList;
//			holder.run();
		}, function(error) {
			console.log(error);
		});
		
		$scope.movePartnerDetailPage = function(e, id) {
			
			if (!$($v_element).find('ol.carousel-indicators li, a.carousel-control, span.icon-prev, span.icon-next').is(e.target)) {
				
				router.push('partnerDetail', id);
			}
		}
    }]);
	
	return {
		show : function() {
			
			var $injector = angular.injector(['americano']);
			var $config = $injector.get('config');
			
			if ($config.currentView != null) {
				$($config.currentView).hide();
			}
			
			$config.currentView = $v_element;
			$($v_element).show();
		}
	}
});