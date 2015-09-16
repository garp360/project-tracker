(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('ResourceController', ResourceController);
    	ResourceController.$inject = ['$scope', '$log', '$controller', '$state', '$firebaseAuth', 'ResourceFactory', 'roles', 'resource'];
    	
    	function ResourceController ($scope, $log, $controller, $state, $firebaseAuth, ResourceFactory, roles, resource) 
    	{
    		$scope.resource = resource;
    		$scope.resource.role = setDefaultRole("EMPLOYEE");
    		$scope.roles = roles;

    		$scope.save = save;
    		$scope.clear = clear;

    		function onChangeRole(role) 
			{
				$scope.resource.role = role;
			};
			
			function save() 
			{
				if($scope.resource.$id) {
					ResourceFactory.save($scope.resource);
				} else{
					ResourceFactory.create($scope.resource);
				}
			};
			
			function clear() 
			{
				$scope.resource = resource;
			}
			
			function setDefaultRole(defaultRole) {
				var role = roles[0];
				for(var i=0; i<roles.length; i++) {
					if(defaultRole === roles[i].name.toUpperCase() )
					{
						role = roles[i];
						break;
					}
				}
				return role;
			}
		};
})();
