define(['jquery', 'angular'], function($, angular) {
	
	var $injector = angular.injector(['americano']);
	var $global = $injector.get('global');
	var $americano = $global.$americano;
	var $v_element = null;
	
	$americano.controller('searchListController', ['$scope', '$element', function($scope, $element) {

		$v_element = $element;
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