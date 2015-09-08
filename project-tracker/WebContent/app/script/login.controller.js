(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('LoginController', LoginController);
    
    	LoginController.$inject = ['$scope', '$log', '$controller', '$state', '$timeout', 'AuthorizationFactory'];
    	
    	function LoginController ($scope, $log, $controller, $state, $timeout, AppController, AuthorizationFactory) 
    	{
    		angular.extend(this, $controller('AppController', {$scope: $scope}));
    		
    		$scope.token = {username:"",password:""};
    		$scope.login = login;
    		$scope.register = register;
    		
    		function login() 
    		{
    			AuthorizationFactory.login($scope.token).then(function(principal) {
    				
    			}, function(err) {
    				
    			});
    		};
    		
    		function register() 
    		{
    			$state.go('registration');
    		};
    	};
})();