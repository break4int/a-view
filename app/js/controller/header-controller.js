define(['jquery', 'angular', 'router', 'sidebarController'], function($, angular, router, sidebarController) {
	
	var $injector = angular.injector(['americano']);
	var $config = $injector.get('config');
	var $americano = $config.americano;
	var $v_element = null;
	
	$americano.controller('HeaderController', ['$scope', '$element', function($scope, $element) {

		$v_element = $element;
		
		$scope.movePartnerList = function(){
			
			router.home();
		}
		
		$scope.moveTicketListPage = function() {
			
			router.push('ticketList');
		}
		
		$scope.moveSearchListPage = function(e) {
			
//			$(e.target).parents('ul.nav.navbar-nav').hide().siblings().show();
			router.push('searchList');
		}
		
		$scope.backSearchCancel = function(e) {
			
//			$(e.target).parents('ul.nav.navbar-nav').hide().siblings().show();
			router.back();
		}
		
		$scope.toggleSideBar = function(e) {
			
			e.preventDefault();
			sidebarController.toggle();
		}
    }]);
	
	return {
		aaa : function() {
			
			$($v_element).find('ul.nav.navbar-nav:first').hide().siblings().show();
		},
		bbb : function() {
			
			$($v_element).find('ul.nav.navbar-nav:last').hide().siblings().show();
		}
	}
});