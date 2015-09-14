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
				AuthorizationFactory.login({username: $scope.token.username, password: $scope.token.password}).then(function(user){
					$scope.user = user;
					$state.go('dashboard');
				}, function(error){
					$log.debug("ERROR: " + error);
				});
			};

			function register() 
			{
				$state.go("registration", {'email': $scope.token.username});
			};
    	};
})();