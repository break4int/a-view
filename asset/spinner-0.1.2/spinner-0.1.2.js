(function( global, factory ) {

	!global.document ? (function() { throw new Error( "jQuery requires a window with a document" ) }())
			: factory(global);

}(this, function(window) {

	var styleString = '';
//	styleString += '<style>';
	styleString += '.spinner-wrap { z-index:999; position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.3); }';
	styleString += '.spinner { position:relative; top:50%; margin:-25px auto 0; width:100px; height:50px; text-align:center; font-size: 10px; }';
	styleString += '.spinner > div { background-color:#333; height: 100%; width: 9px; display: inline-block; -webkit-animation: stretchdelay 1.2s infinite ease-in-out; animation: stretchdelay 1.2s infinite ease-in-out; }';
	styleString += '.spinner .rect2 { -webkit-animation-delay:-1.1s; animation-delay:-1.1s; }';
	styleString += '.spinner .rect3 { -webkit-animation-delay:-1.0s; animation-delay:-1.0s; }';
	styleString += '.spinner .rect4 { -webkit-animation-delay:-0.9s; animation-delay:-0.9s; }';
	styleString += '.spinner .rect5 { -webkit-animation-delay:-0.8s; animation-delay:-0.8s; }';
	styleString += '@-webkit-keyframes stretchdelay { 0%, 40%, 100% { -webkit-transform: scaleY(0.5) } 20% { -webkit-transform: scaleY(1.0) } }';
	styleString += '@keyframes stretchdelay { 0%, 40%, 100% { transform: scaleY(0.5); -webkit-transform: scaleY(0.5); }  20% { transform: scaleY(1.0); -webkit-transform: scaleY(1.0); } }';
//	styleString += '</style>';
	var elStyle = window.document.createElement('style');
	elStyle.innerText = styleString;
	window.document.getElementsByTagName('head')[0].appendChild(elStyle);

	var spinnerString = '';
//	spinnerString += '<div class="spinner-wrap" style="display:none;">';
	spinnerString += '<div class="spinner">';
	spinnerString += '<div class="rect1"></div>';
	spinnerString += '&nbsp;<div class="rect2"></div>';
	spinnerString += '&nbsp;<div class="rect3"></div>';
	spinnerString += '&nbsp;<div class="rect4"></div>';
	spinnerString += '&nbsp;<div class="rect5"></div>';
	spinnerString += '</div>';
//	spinnerString += '</div>';
		
	var elSpinner = window.a = window.document.createElement('div');
	elSpinner.classList.add('spinner-wrap');
	elSpinner.style.display = 'none';
	elSpinner.innerHTML = spinnerString;
	window.document.getElementsByTagName('body')[0].appendChild(elSpinner);
	
	var showCount = 0;
	
	var spinner = {
			setColor : function(color) {
				
				Array.prototype.forEach.call(elSpinner.children[0].children, function(child) {
					child.style.backgroundColor = color; 
				});
			},
			show: function() {
				showCount++;
				if (showCount == 1) {
					elSpinner.style.display = '';
				}
			},
			hide: function() {
				showCount--;
				if (showCount == 0) {
					elSpinner.style.display = 'none';
				}
			}
	}
	
	if ( typeof define === "function" && define.amd ) {
		define( "spinner", [], function() {
			return spinner;
		});
	}
	
	window.spinner = spinner;
}));