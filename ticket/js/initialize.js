requirejs.config({
//	urlArgs: 'ts=' + (new Date()).getTime(),
	baseUrl : './js',
	paths : {
		//'text': '../asset/require/text',
		'jquery' : '../../asset/jquery-1.11.1/jquery-1.11.1.min',
		'angular' : '../../asset/angular-1.3.15/angular.min',
		'bootstrap' : '../../asset/bootstrap-3.3.1/js/bootstrap.min',
		'ngResource' : '../../asset/angular-1.3.15/angular-resource.min',
		'ngMockE2E' : '../../asset/angular-1.3.15/angular-mocks',
		'ngTouch' : '../../asset/angular-1.3.15/angular-touch.min',
		'restaurantController' : './controller/restaurant-controller',
		'bankController' : './controller/bank-controller',
		'mainController' : './controller/main-controller',
		'restAPIFactory' : './factory/restapi-factory'
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
		}
	},
	waitSeconds : 3
});

requirejs(['jquery', 'angular', 'bootstrap', 'ngResource', 'ngMockE2E', 'ngTouch'], function($, angular, bootstrap) {
	
	var ticket = window.app = angular.module('ticket', ['ngResource', 'ngMockE2E', 'ngTouch']);
	
	ticket.constant('config', {
		ticket : ticket,
		apiPrefix : './json',
	});
	
	var viewName = 'bank';
	//var viewName = 'restaurant';
	requirejs(['restAPIFactory', 'mainController', viewName+"Controller"], function(restAPIFactory, controller) {
		angular.bootstrap(document, ['ticket']);
		controller.init(viewName);
	});
});