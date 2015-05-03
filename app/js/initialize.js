requirejs.config({
//	urlArgs: 'ts=' + (new Date()).getTime(),
	baseUrl : './js',
	paths : {
		'text': '../../asset/require-2.1.17/text',
		'jquery' : '../../asset/jquery-1.11.1/jquery-1.11.1.min',
		'angular' : '../../asset/angular-1.3.15/angular.min',
		'ngResource' : '../../asset/angular-1.3.15/angular-resource.min',
		'ngMockE2E' : '../../asset/angular-1.3.15/angular-mocks',
		'ngTouch' : '../../asset/angular-1.3.15/angular-touch.min', // 'https://docs.angularjs.org/angular-touch',
		'bootstrap' : '../../asset/bootstrap-3.3.1/js/bootstrap.min',
		'paradox' : '../../asset/paradox-0.8.x/paradox-0.8.0',
		'holder' : '../../asset/holder/holder',
		'spinner' : '../../asset/spinner-0.1.2/spinner-0.1.2',
		'serverBridge' : './bridge/server-bridge',
		'restAPIFactory' : './factory/restapi-factory',
		'router' : './route/router',
		'appController' : './app-controller',
		'partnerListController' : './controller/partner-list-controller',
		'partnerDetailController' : './controller/partner-detail-controller',
		'searchListController' : './controller/search-list-controller',
		'ticketListController' : './controller/ticket-list-controller'
	},
	shim : {
		'angular':{
			deps : ['jquery'],
			exports:'angular'
		},
		'ngResource':{
			deps : ['angular'],
			exports:'ngResource'
		},
		'ngMockE2E':{
			deps : ['angular'],
			exports:'ngMockE2E'
		},
		'ngTouch':{
			deps : ['angular'],
			exports:'ngTouch'
		},
		'bootstrap' : {
			deps : ['jquery']
		},
		'holder' : {
			exports:'Holder'
		}
	},
	waitSeconds : 3
});

requirejs(['spinner'], function(spinner) {

	spinner.setColor('#ffc000');
	spinner.show();

	require(['jquery', 'angular', 'bootstrap', 'ngResource', 'ngTouch'], function($, angular, bootstrap) {
		
		var $americano = angular.module('americano', ['ngResource', 'ngTouch']);
		
		$americano.constant('global', {
			$americano : $americano,
			currentView : null
		}).constant('config', {
			BASE_URL : localStorage.getItem('test') ? localStorage.getItem('test') + '/americano/api' : '/americano/api' 
		});
		
		require(['serverBridge', 'restAPIFactory'], function(serverBridge) {
			
			var onReady = function() {
				require(['router'], function(router) {
					angular.bootstrap(document, ['americano']);
					spinner.hide();
				});
			};
			
			// TODO Device 인증과정
			if (localStorage.getItem('fingerprint')) {
				onReady();
			} else {
				serverBridge.ajax({
					url: '/device/fingerprint',
					type: 'GET',
					success: function(data) {
						localStorage.setItem('fingerprint', data);
						onReady();
					}
				});
			}
		});
	});
});