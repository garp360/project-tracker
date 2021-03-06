(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('AuthController', AuthController);
    	AuthController.$inject = ['$scope', '$log', '$controller', '$state', '$firebaseAuth', 'AuthFactory'];
    	
    	function AuthController ($scope, $log, $controller, $state, $firebaseAuth, AuthFactory) {
			angular.extend(this, $controller('BaseController', {$scope: $scope}));
			
			$scope.authRef = $firebaseAuth(new Firebase("https://astadia-trax.firebaseio.com"));
			$scope.isAuth = false;
			$scope.user = {};
			$scope.loginForm = {};
			
			$scope.authRef.$onAuth(function(authData) {
				if (authData) {
					console.log("Logged in as:", authData.uid);
					$scope.isAuth = true;
				} else {
					console.log("Logged out");
					$scope.user = {};
					$scope.loginForm = {};
					$scope.isAuth = false;
					$scope.user = {};
				}
			});
		
			$scope.signIn = function(loginForm) {
				$log.debug("email = " + loginForm.username);
				AuthFactory.login({username: loginForm.username, password: loginForm.password}).then(function(user){
					$scope.user = user;
				});
			};
			
			$scope.register = function(loginForm) {
				$log.debug("email = " + loginForm.username);
				$state.go("registration", {'email': loginForm.username});
			};
		
			$scope.logoff = function() {
				AuthFactory.logoff();
			};
			
			$scope.resetPassword = function() {
				
			};
		};
})();
