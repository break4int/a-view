define(['jquery', 'angular', 'paradox', 'appController'
        , 'partnerListController', 'partnerDetailController'
        , 'searchListController', 'ticketListController']
, function($, angular, paradox) {
	
	var $injector = angular.injector(['americano']);
	var $global = $injector.get('global');
	var $americano = $global.$americano;
	var $v_currentMode = null;
	
	return {
		init : function(mode) {
			
			paradox.ready(null, function() {
				
				$v_currentMode = mode; 
				require([mode + 'Controller'], function(controller) {
					controller.show();
				})
			});			
		},
		push : function(mode, data) {
			
			var currentMode = $v_currentMode;
			
			if (mode != currentMode) {
				paradox.push(null, function() {
					
					require([mode + 'Controller', 'appController'], function(controller, appController) {
						
						if (mode === 'searchList') {
							appController.header.aaa();
						}
						
						// FIXME mobile 일때만 동작하도록 할것.. 어차피 모바일 용이지만..
						appController.sidebar.collapse();
						
						$v_currentMode = mode;
						controller.show(data);
					})
				}, function() {
					
					require([currentMode + 'Controller', 'appController'], function(controller, appController) {
						
						if ($v_currentMode === 'searchList') {
							appController.header.bbb();
						}
						
						// FIXME mobile 일때만 동작하도록 할것.. 어차피 모바일 용이지만..
						appController.sidebar.collapse();
						
						$v_currentMode = currentMode;
						controller.show();
					})
				});
			}
		},
		back : function() {
			
			paradox.back();
		},
		home : function() {
			
			var currentIndex = paradox.getCurrentHistoryIndex();
			if (currentIndex > 0) {
				paradox.go(currentIndex * -1);	
			}
		}
	}
});