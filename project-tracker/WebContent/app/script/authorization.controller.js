(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('AuthController', AuthController);
    
	    AuthController.$inject = ['$scope', '$log', '$state', '$timeout', 'AuthorizationFactory'];
    	
    	function AuthController($scope, $log, $state, $timeout, AuthorizationFactory) 
    	{
    		this.isAuth = isAuth;
    		
    		function isAuth() 
    		{
    			return AuthorizationFactory.isAuth();
    		}
    		
    	};

})();