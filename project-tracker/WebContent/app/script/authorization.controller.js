(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('AuthorizationController', AuthorizationController);
    
        AuthorizationController.$inject = ['$scope', '$log', '$state', '$timeout', '$firebaseAuth', 'AuthorizationFactory'];
    	
    	function AuthorizationController($scope, $log, $state, $timeout, $firebaseAuth, AuthorizationFactory) 
    	{
    		$scope.authRef = $firebaseAuth(new Firebase("https://astadia-trax.firebaseio.com"));
			$scope.isAuth = false;
			$scope.user = {};
			$scope.signOut = logoff;

			$scope.authRef.$onAuth(function(authData) 
			{
				if (authData) 
				{
					console.log("Logged in as:", authData.uid);
					$scope.isAuth = true;
				} 
				else 
				{
					console.log("Logged out");
					$scope.user = {};
					$scope.isAuth = false;
					$scope.user = {};
				}
			});
		
			function login(loginForm) 
			{
				$log.debug("email = " + loginForm.username);
				AuthorizationFactory.login({username: loginForm.username, password: loginForm.password}).then(function(user){
					$scope.user = user;
				});
			};
			
			function register(loginForm) 
			{
				$log.debug("email = " + loginForm.username);
				$state.go("registration", {'email': loginForm.username});
			};
		
			function logoff() 
			{
				AuthorizationFactory.logoff();
			};
			
			function resetPassword() 
			{
				
			};
		};
})();
