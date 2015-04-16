define(['jquery', 'angular', 'Paradox', 'headerController'
        , 'partnerListController', 'partnerDetailController'
        , 'searchListController', 'ticketListController']
, function($, angular, Paradox) {
	
	var $injector = angular.injector(['americano']);
	var $global = $injector.get('global');
	var $americano = $global.$americano;
	var $v_currentMode = null;
	var paradox = Paradox.getInstance();
	
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
					
					require([mode + 'Controller', 'headerController', 'sidebarController'], function(controller, headerController, sidebarController) {
						
						if (mode === 'searchList') {
							headerController.aaa();
						}
						
						// FIXME mobile 일때만 동작하도록 할것.. 어차피 모바일 용이지만..
						sidebarController.collapse();
						
						$v_currentMode = mode;
						controller.show(data);
					})
				}, function() {
					
					require([currentMode + 'Controller', 'headerController', 'sidebarController'], function(controller, headerController, sidebarController) {
						
						if ($v_currentMode === 'searchList') {
							headerController.bbb();
						}
						
						// FIXME mobile 일때만 동작하도록 할것.. 어차피 모바일 용이지만..
						sidebarController.collapse();
						
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