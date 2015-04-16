define(['jquery', 'angular', 'holder'], function($, angular, holder) {
	
	var $injector = angular.injector(['americano']);
	var $global = $injector.get('global');
	var $americano = $global.$americano;
	var $v_element = null;
	
	
	$americano.directive('partnerRepeatDirective', function() {
		return function(scope, element, attrs) {
//			angular.element(element).css('color','blue');
			if (scope.$last){
				window.holder = holder;
				holder.run();
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
				
				require('router').push('partnerDetail', id);
			}
		}
    }]);
	
	return {
		show : function() {
			
			var $injector = angular.injector(['americano']);
			var $global = $injector.get('global');
			
			if ($global.currentView != null) {
				$($global.currentView).hide();
			}
			
			$global.currentView = $v_element;
			$v_element.css('display', 'block');
			setTimeout(function(h){h.run();}, 10, holder);
		}
	}
});