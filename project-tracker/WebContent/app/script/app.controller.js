(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('AppController', AppController)
    	.controller('SideBarLeftController', SideBarLeftController)
    	.controller('SideBarRightController', SideBarRightController);
    
    	AppController.$inject = ['$scope', '$log', '$timeout', '$mdSidenav', '$mdUtil'];
    	SideBarLeftController.$inject = ['$scope', '$log', '$timeout', '$mdSidenav'];
    	SideBarRightController.$inject = ['$scope', '$log', '$state', '$timeout', '$mdSidenav'];
    	
    	function AppController ($scope, $log, $timeout, $mdSidenav, $mdUtil) 
    	{
    		$scope.toggleLeft = buildToggler('left');
    	    $scope.toggleRight = buildToggler('right');
    	    /**
    	     * Build handler to open/close a SideNav; when animation finishes
    	     * report completion in console
    	     */
    	    function buildToggler(navID) 
    	    {
    	      var debounceFn =  $mdUtil.debounce(function(){
    	            $mdSidenav(navID)
    	              .toggle()
    	              .then(function () {
    	                $log.debug("toggle " + navID + " is done");
    	              });
    	          },200);
    	      return debounceFn;
    	    }
    	};
    	
    	function SideBarLeftController($scope, $log, $timeout, $mdSidenav) 
    	{
    	    $scope.close = function () {
    	        $mdSidenav('left').close().then(function () {
    	            $log.debug("close LEFT is done");
    	        });
    	    };
    	};
    	   
    	    
	    function SideBarRightController($scope, $log, $state, $timeout, $mdSidenav) 
	    {
	    	$scope.close = close;
	    	$scope.newProject = newProject;
	    	$scope.newResource = newResource;
	    	
	    	
	    	function close() {
	    		$mdSidenav('right').close().then(function () {
    				$log.debug("close RIGHT is done");
    	        });
	        };
	        
	        function newProject() {
	        	$state.go('new-project');
	        	close();
	        };

	        function newResource() {
	        	
	        };
        };
})();