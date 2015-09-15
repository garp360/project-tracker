(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('ResourceController', ResourceController);
    	ResourceController.$inject = ['$scope', '$log', '$controller', '$state', '$firebaseAuth', 'ResourceFactory', 'roles', 'resource'];
    	
    	function ResourceController ($scope, $log, $controller, $state, $firebaseAuth, ResourceFactory, roles, resource) 
    	{
    		$scope.resource = angular.copy(resource);
    		$scope.currentRole = resource.role;

    		$scope.save = save;
    		$scope.clear = clear;

    		function onChangeRole(role) 
			{
				$scope.resource.role = role;
			};
			
			function save() 
			{
				ResourceFactory.saveResource($scope.resource);
			};
			
			function clear() 
			{
				$scope.resource = resource;
			}
		};
})();
