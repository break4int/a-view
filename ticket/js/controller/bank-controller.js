define(['jquery', 'angular'], function($, angular) {
	
	var $injector = angular.injector(['ticket']);
	var $config = $injector.get('config');
	var $ticket = $config.ticket;
	var $v_element = null;
	
	$ticket.controller('bankController', ['$scope', '$element','restAPIFactory', '$http', function($scope, $element, $restAPIFactory, $http) {
		$scope.deposit_wait_cnt = 0;
		$scope.loans_wait_cnt = 0;
		$scope.current_mode = 'deposit';
		
		$v_element = $element;
		$($v_element).find(".nfctag-form").hide();

		$scope.buttonHandler = function(event, mode) {
			console.log(mode);
			if(mode === 'deposit') {
				$scope.display_wait_cnt = $scope.deposit_wait_cnt;
				$scope.current_mode = 'deposit';
				$($v_element).find(".button-form").hide();
				$($v_element).find(".nfctag-form").show();
			} else if(mode === 'loans') {
				$scope.current_mode = 'loans';
				$scope.display_wait_cnt = $scope.loans_wait_cnt;
				$($v_element).find(".button-form").hide();
				$($v_element).find(".nfctag-form").show();				
			} else {
				sendServer(1, $scope.current_mode);
				$($v_element).find(".button-form").show();
				$($v_element).find(".nfctag-form").hide();
			}
		}
		
		var displayWaitCnt = function(mode, waitCount) {
			console.log(mode);
			console.log(waitCount);
			if(mode === 'deposit') {
				$scope.deposit_wait_cnt = waitCount;
			} else if(mode === 'loans') {
				$scope.loans_wait_cnt = waitCount;
			}
		};
		
		var sendServer = function(id, mode) {
			console.log("sendServier : " + id + " : " + mode);
			
			
			$restAPIFactory.ticket.query({
				ticketId : id,
				ticketMode : mode
			}, function(response) {
				console.log("response data : " +response.mode);
				console.log("response data : " +response.waitCount);
				displayWaitCnt(response.mode, response.waitCount);
				//console.log(response);
			}, function(error) {
				console.log("response error");
			//	console.log(error);
			});
		}
		
		
	}]);
	
	return {
		show : function() {
			console.log($v_element);
			//$($resource).show();
		}
	}
	
	
});