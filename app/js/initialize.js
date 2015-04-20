requirejs.config({
//	urlArgs: 'ts=' + (new Date()).getTime(),
	baseUrl : './js',
	paths : {
		'text': '../../asset/require-2.1.17/text',
		'jquery' : '../../asset/jquery-1.11.1/jquery-1.11.1.min',
		'angular' : '../../asset/angular-1.3.15/angular.min',
		'ngResource' : '../../asset/angular-1.3.15/angular-resource.min',
		'ngMockE2E' : '../../asset/angular-1.3.15/angular-mocks',
		'ngTouch' : '../../asset/angular-1.3.15/angular-touch.min',
		'bootstrap' : '../../asset/bootstrap-3.3.1/js/bootstrap.min',
		'paradox' : '../../asset/paradox-0.7.13/paradox-0.7.13',
		'holder' : '../../asset/holder/holder',
		'restAPIFactory' : './factory/restapi-factory',
		'router' : './route/router',
		'appController' : './controller/app-controller',
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
		},
		'paradox' : {
			exports:'paradox'
		}
	},
	waitSeconds : 3
});

requirejs(['jquery', 'angular', 'bootstrap', 'ngResource', 'ngMockE2E', 'ngTouch'], function($, angular, bootstrap) {
	
	var $americano = angular.module('americano', ['ngResource', 'ngMockE2E', 'ngTouch']);
	
	$americano.constant('global', {
		$americano : $americano,
		currentView : null
	}).constant('config', {
		BASE_URL : '/americano/api'
	});
	
	require(['router', 'restAPIFactory'], function(router) {
		
		angular.bootstrap(document, ['americano']);
		
		var mode = (location.search != null && location.search.trim() != '') ? location.search.replace('?', '') : 'partnerList';
		router.init(mode);
	});
});