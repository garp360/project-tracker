(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('RegistrationController', RegistrationController);
    
	    RegistrationController.$inject = ['$scope', '$log', '$state', '$timeout', 'AuthorizationFactory', 'registration'];
    	
    	function RegistrationController($scope, $log, $state, $timeout, AuthorizationFactory, registration) 
    	{
    		$scope.registration = registration;
    		$scope.clear = clear;
    		$scope.register = register;
    		
    		
    		function clear()
    		{
    			$scope.registration = {};
    		};
    		
    		function register() 
    		{
    			AuthorizationFactory.register($scope.registration).then(function(user){
    					
				}, function(error) {
					
				});
    			
    		};
 
    	};
})();