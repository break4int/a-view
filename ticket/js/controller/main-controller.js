define(['jquery', 'angular'], function($, angular) {
	var $injector = angular.injector(['ticket']);
	var $config = $injector.get('config');
	var $ticket = $config.ticket;
	var $v_element = null;
	var $v_scope = null;
	var $v_currentMode = null;
	var $v_compile = null;

	$ticket.controller('mainController', ['$scope', '$element', 'restAPIFactory', '$http', '$compile', function($scope, $element, $restAPIFactory, $http, $compile) {
		$v_element = $element;
		$v_scope = $scope;
		$v_compile = $compile;
		
		//event...
		console.log("0000");
	}]);
	
	return {
		init : function(mode) {
			var loadModule = mode+'Controller';
			console.log(loadModule);

			$.get('./tmpl/' + mode + '-tmpl.html', function(data) {
				var tmplate = angular.element(data);
				$($v_element).append(tmplate);
				$v_compile(tmplate)($v_scope);
			});

		}
	}
});
