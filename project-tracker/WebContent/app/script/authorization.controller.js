(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('AuthController', AuthController);
    
	    AuthController.$inject = ['$scope', '$log', '$state', '$timeout', 'AuthorizationFactory'];
    	
    	function AuthController($scope, $log, $state, $timeout, AuthorizationFactory) 
    	{
    		var authRef = $firebaseAuth(BaseFactory.AUTH_REF);
    		$scope.isAuth = false;
    		$scope.currentUser = {};
    		
    		$scope.authRef.$onAuth(function(auth) {
				if (auth) {
					console.log("Logged in as:", auth.uid);
					$scope.isAuth = true;
					return $scope.currentUser = AuthFactory.getUser(auth.uid);
				} else {
					console.log("Logged out");
					$scope.isAuth = false;
					return  {};					
				}
			}).then(function(user) {
				$scope.currentUser = user;
			});
    	};

})();