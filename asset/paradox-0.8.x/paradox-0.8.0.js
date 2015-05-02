(function(global, factory) {

	!global.history ? (function() { throw new Error( "jQuery requires a window with a history" ) }())
			: factory(global);

}(this, function(window) {
	
	var console = window.console;
	var history = window.history;
	var location = window.location;
	
	var currStateIndex = -1;
	var historyList = null // Array;
//	{
//		'forward' : undefined,
//		'backward' : undefined
//	}
    var browserForwardBlock = false;
	
    var TYPEOF_FUNCTION = typeof(function() {});
    function isFunction(func) {
    	return typeof(func) === TYPEOF_FUNCTION;
    }
    
    function go(idx) {
    	history.go(idx);
    }
    
    function forward() {
    	history.forward();
    }
    
    function back() {
    	history.back();
    }
    
    window.addEventListener("popstate", function(e) {
    	
    	var oldStateIndex = -1;
    	var newStateIndex = -1;
    	
//    	oldStateIndex = currStateIndex;
//    	newStateIndex = e.state.index;
//    	
//    	if (newStateIndex != undefined && newStateIndex != null ) {
//    		currStateIndex = newStateIndex;
//    		
//    		console.debug('[paradox] currStateIndex : ' + currStateIndex);
//    		console.debug(historyList);
//    		
//    		var callback = null;
//    		var data = null;
//    		if ( oldStateIndex < currStateIndex ) {
//        		/** 앞으로 진입할때는 진입한 페이지의 forward 이벤트를 적용받음 */
//    			callback = historyList[currStateIndex].forward;
//    			data = historyList[currStateIndex].data;
//    			isFunction(callback) && callback.call(paradox, {'index': currStateIndex, 'data' : data});
//    		} else if ( oldStateIndex > currStateIndex ){
//        		/** 뒤로 일때도 도착한 페이지의 backward 이벤트를 적용받음 */
//    			callback = historyList[currStateIndex].backward;
//    			data = historyList[currStateIndex].data;
//    			isFunction(callback) && callback.call(paradox, {'index': currStateIndex, 'data' : data});
//    			
//        		if (browserForwardBlock) {
//        			historyList[oldStateIndex].data = null;
//        			historyList[oldStateIndex].forward = back;
//    	    		historyList[oldStateIndex].backward = back;
//    	    		historyList[currStateIndex].backward = null;
//    	    	}
//        	}
//    	} else {
//    		// replaceState를 해서 그런지 초기에 state == null로 이벤트 콜백이 한번 발생함
//    		//console.error('등록되지 않은 state index입니다.');
//    	}
    	
    	currStateIndex = e.state.index;
    	
    	console.log(e.state);
    	isFunction(paradox.popstateListener) && paradox.popstateListener.call(this, e.state);
    	
	}, false);
    
	/**
	 * Class paradox
	 */
    var paradox = {
    		getCurrentStateIndex: function() {
    			return currStateIndex;
    		},
    		/**
    		 * path, [data], callback
    		 */
    		ready : function(path, data, callback) {
    			
    			var state = history.state; 
    			
    			{ // 초기 진입 설정
	    			if (!state) {
	    				
	    				state = {
	    						index: 0,
	    						path: path
	    				};
	    				history.replaceState(state, null, location.href);
	    			}
    			}
    			
    			{ // state 값에 해당하는 history list 생성
	    			historyList = [];
	    			for (var i = 0, iMax=state.index; i<iMax; i++) {
						historyList.push({
							path: null,
	    					data : null
						})
					}
	    			currStateIndex = state.index;
					historyList[state.index] = {
							path: state.path,
							data: data
					}
    			}	
    			
    			{ // init
					isFunction(callback) && callback.call(this, {
						index: currStateIndex,
						path: historyList[currStateIndex].path,
						data : historyList[currStateIndex].data
	    			});
    			}
			},
			push : function(path, data, callback) {
				
				var newStateIndex = currStateIndex + 1;
    			
    			if (newStateIndex > 0) {
    				
    				if (historyList.length > currStateIndex) {
    					historyList.splice(newStateIndex, historyList.length - newStateIndex);
        			}
        			
    				var newState = {
    						index: newStateIndex,
    						path: path
    				}
    				
    				currStateIndex = newStateIndex;
    				historyList[currStateIndex] = {
    						path: path,
    						data: data
    				}
    						
        			history.pushState(newState, null, location.href);
        			isFunction(callback) && callback.call(this, {
						index: currStateIndex,
						path: historyList[currStateIndex].path,
						data : historyList[currStateIndex].data
	    			});
    			} else {
    				
    				console.error("please execute paradox.ready");
    			}
			},
    		replace : function(replacePath, replaceData, callback) {
    			
    			(replacePath == undefined) && (replacePath = historyList[currStateIndex].path);
    			(replaceData == undefined) && (replaceData = historyList[currStateIndex].data);
    			
    			var replaceState = {
						index: currStateIndex,
						path: replacePath
				}
				
				historyList[currStateIndex].path = replacePath;
				historyList[currStateIndex].data = replaceData;
						
    			history.replaceState(replaceState, null, location.href);
    			
    			isFunction(callback) && callback.call(this, {
					index: currStateIndex,
					path: historyList[currStateIndex].path,
					data : historyList[currStateIndex].data
    			});
    		},
    		popstateListener: function() {
    			
    		},
			 // 해당 index의 앞 뒤 History를 연결 (설정된 callback제거)
		    link : function(index) {
		    	var result = false;
    			if (index >= 0 && this.getCurrentHistoryIndex() != index) {
    				// data 지우기
    				this.setForwardCallback(index, this.forward);
    				this.setBackwardCallback(index, this.back);
	    			result = true;
    			}
    			
    			return result;
		    },
			// 해당 index 이후의 모든 History 제거 (설정된 callback제거)
			pop : function() {
				var index = this.getCurrentHistoryIndex();
    			
    			if (index > 0) {
    				// data 지우기
    				this.setForwardCallback(index, this.back);
    				this.setBackwardCallback(index, this.back);
    				this.back();
    			}
			},
			go : go,
			// History를 강제로 한 단계 진입
		    forward : forward,
		    // History를 강제로 한 단계 후퇴
		    back : back,
    		/**
    		 * default false
    		 * true 적용시 브라우저의 앞으로 가기를 금지 시킬 수 있습니다.
    		 */
    		setBrowserForwardBlock : function(value) {
    			/** true / false */
    			browserForwardBlock = value;
    		}
    };
	
    
    if (typeof define === "function" && define.amd) {
		define("paradox", [], function() {
			return paradox;
		});
	}
    
	window.paradox = paradox;
	
}));