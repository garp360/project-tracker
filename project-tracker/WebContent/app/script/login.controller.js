(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('LoginController', LoginController);
    
    	LoginController.$inject = ['$scope', '$log', '$controller', '$state', '$timeout', 'AuthorizationFactory'];
    	
    	function LoginController ($scope, $log, $controller, $state, $timeout, AuthorizationFactory) 
    	{
    		angular.extend(this, $controller('AuthorizationController', {$scope: $scope}));
    		$scope.token = {username:"",password:""};
    		$scope.signIn = signIn;
    		$scope.register = register;
    		
    		function signIn() 
    		{
    			this.login($scope.token);
    		};

    		function register() 
    		{
    			$state.go('registration');
    		};
    	};
})();