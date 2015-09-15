(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('AppController', AppController)
    	.controller('SideBarLeftController', SideBarLeftController)
    	.controller('SideBarRightController', SideBarRightController);
    
    	AppController.$inject = ['$scope', '$log', '$controller', '$state', '$timeout', '$mdSidenav', '$mdUtil'];
    	SideBarLeftController.$inject = ['$scope', '$log', '$controller', '$timeout', '$mdSidenav'];
    	SideBarRightController.$inject = ['$scope', '$log', '$controller', '$state', '$timeout', '$mdSidenav'];
    
    	function AppController ($scope, $log, $controller, $state, $timeout, $mdSidenav, $mdUtil) 
    	{
    		angular.extend(this, $controller('AuthorizationController', {$scope: $scope}));
    		$scope.toggleLeft = buildToggler('left');
    	    $scope.toggleRight = buildToggler('right');
    	    $scope.goToHome = goToHome;
    	    $scope.goToSignIn = goToSignIn;
    	    
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
    	    
    	    function goToHome() {
	        	$state.go('dashboard');
	        };

	        function goToSignIn() {
	        	$state.go('login');
	        };
    	};
    	
    	function SideBarLeftController($scope, $log, $controller, $timeout, $mdSidenav) 
    	{
    		angular.extend(this, $controller('AuthorizationController', {$scope: $scope}));
    		
    	    $scope.close = function () {
    	        $mdSidenav('left').close().then(function () {
    	            $log.debug("close LEFT is done");
    	        });
    	    };
    	};
    	   
    	    
	    function SideBarRightController($scope, $log, $controller, $state, $timeout, $mdSidenav) 
	    {
	    	angular.extend(this, $controller('AuthorizationController', {$scope: $scope}));
	    	
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
	        	$state.go('new-resource');
	        	close();
	        };
        };
})();