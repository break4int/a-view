define(['jquery', 'angular', 'sidebarController'], function($, angular, sidebarController) {
	
	var $injector = angular.injector(['americano']);
	var $global = $injector.get('global');
	var $americano = $global.$americano;
	var $v_element = null;
	
	$americano.controller('HeaderController', ['$scope', '$element', function($scope, $element) {

		$v_element = $element;
		
		$scope.movePartnerList = function(){
			
			require('router').home();
		}
		
		$scope.moveTicketListPage = function() {
			
			require('router').push('ticketList');
		}
		
		$scope.moveSearchListPage = function(e) {
			
//			$(e.target).parents('ul.nav.navbar-nav').hide().siblings().show();
			require('router').push('searchList');
		}
		
		$scope.backSearchCancel = function(e) {
			
//			$(e.target).parents('ul.nav.navbar-nav').hide().siblings().show();
			require('router').back();
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