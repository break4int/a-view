define(['jquery', 'angular'], function($, angular) {
	
	var $injector = angular.injector(['americano']);
	var $global = $injector.get('global');
	var $americano = $global.$americano;
	var $_element = null;
	
	var _header = {
		aaa : function() {
			
			$($_element).find('ul.nav.navbar-nav:first').hide().siblings().show();
		},
		bbb : function() {
			
			$($_element).find('ul.nav.navbar-nav:last').hide().siblings().show();
		}
	};
	var _sidebar = {
		toggle : function() {
			
			//If window is small enough, enable sidebar push menu
			if ($(window).width() <= 992) {
	            $('.row-offcanvas').toggleClass('active');
	            $('.left-side').removeClass("collapse-left");
	            $(".right-side").removeClass("strech");
	            $('.row-offcanvas').toggleClass("relative");
	        } else {
	            //Else, enable content streching
	            $('.left-side').toggleClass("collapse-left");
	            $(".right-side").toggleClass("strech");
	        }
		},
		expand : function() {
			
			if ($(window).width() <= 992) {
	            $('.row-offcanvas').addClass('active');
	            $('.left-side').removeClass("collapse-left");
	            $(".right-side").removeClass("strech");
	            $('.row-offcanvas').addClass("relative");
	        } else {
	            //Else, enable content streching
	            $('.left-side').removeClass("collapse-left");
	            $(".right-side").removeClass("strech");
	        }
		},
		collapse : function() {
			
			if ($(window).width() <= 992) {
	            $('.row-offcanvas').removeClass('active');
	            $('.left-side').removeClass("collapse-left");
	            $(".right-side").removeClass("strech");
	            $('.row-offcanvas').removeClass("relative");
	        } else {
	            //Else, enable content streching
	            $('.left-side').addClass("collapse-left");
	            $(".right-side").addClass("strech");
	        }
		}
	};
	
	/*
     * SIDEBAR MENU
     * ------------
     * This is a custom plugin for the sidebar menu. It provides a tree view.
     * 
     * Usage:
     * $(".sidebar).tree();
     * 
     * Note: This plugin does not accept any options. Instead, it only requires a class
     *       added to the element that contains a sub-menu.
     *       
     * When used with the sidebar, for example, it would look something like this:
     * <ul class='sidebar-menu'>
     *      <li class="treeview active">
     *          <a href="#>Menu</a>
     *          <ul class='treeview-menu'>
     *              <li class='active'><a href=#>Level 1</a></li>
     *          </ul>
     *      </li>
     * </ul>
     * 
     * Add .active class to <li> elements if you want the menu to be open automatically
     * on page load. See above for an example.
     */
    (function($) {
        "use strict";

        $.fn.tree = function() {

            return this.each(function() {
                var btn = $(this).children("a").first();
                var menu = $(this).children(".treeview-menu").first();
                var isActive = $(this).hasClass('active');

                //initialize already active menus
                if (isActive) {
                    menu.show();
                    btn.children(".fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
                }
                //Slide open or close the menu on link click
                btn.click(function(e) {
                    e.preventDefault();
                    if (isActive) {
                        //Slide up to close menu
                        menu.slideUp();
                        isActive = false;
                        btn.children(".fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
                        btn.parent("li").removeClass("active");
                    } else {
                        //Slide down to open menu
                        menu.slideDown();
                        isActive = true;
                        btn.children(".fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
                        btn.parent("li").addClass("active");
                    }
                });

                /* Add margins to submenu elements to give it a tree look */
                menu.find("li > a").each(function() {
                    var pad = parseInt($(this).css("margin-left")) + 10;

                    $(this).css({"margin-left": pad + "px"});
                });

            });

        };

    }(jQuery));
	
	$americano.controller('AppController', ['$scope', '$element', function($scope, $element) {

		$_element = $element;

		$scope.moveHome = function() {
			
			require('router').home();
		}
		
		$scope.move = function(next) {
			
			require('router').push(next);
		}
		
		$scope.moveSearchListPage = function(e) {
			
//			$(e.target).parents('ul.nav.navbar-nav').hide().siblings().show();
			require('router').push('searchList');
		}
		
		$scope.backSearchCancel = function(e) {
			
//			$(e.target).parents('ul.nav.navbar-nav').hide().siblings().show();
			require('router').back();
		}
		
		$scope.toggleSideBar = function(e) {
			
			e.preventDefault();
			_sidebar.toggle();
		}
				
		//Add hover support for touch devices
	    $('.btn').bind('touchstart', function() {
	        $(this).addClass('hover');
	    }).bind('touchend', function() {
	        $(this).removeClass('hover');
	    });
	    
	    /* Sidebar tree view */
	    $(".sidebar .treeview").tree();
	    
    }]);
	
	return {
		header : _header,
		sidebar : _sidebar
	}
});