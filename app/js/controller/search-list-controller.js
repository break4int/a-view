define(['jquery', 'angular'], function($, angular) {
	
	var $injector = angular.injector(['americano']);
	var $config = $injector.get('config');
	var $americano = $config.americano;
	var $v_element = null;
	
	$americano.controller('searchListController', ['$scope', '$element', function($scope, $element) {

		$v_element = $element;
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