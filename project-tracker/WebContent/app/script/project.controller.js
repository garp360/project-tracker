(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('ProjectController', ProjectController);
    	ProjectController.$inject = ['$scope', '$log', '$controller', '$state', '$firebaseAuth', 'ProjectFactory', 'statusTypes', 'resources', 'project'];
    	
    	function ProjectController ($scope, $log, $controller, $state, $firebaseAuth, ProjectFactory, statusTypes, resources, project) {
    		
    		$scope.project = project;
    		$scope.statusTypes = statusTypes;
    		$scope.resources = resources;

    		$scope.currentOwner = $scope.resources[0];
    		$scope.currentStatus = project.status;

			$scope.onChangeOwner = onChangeOwner;
			$scope.onChangeStatus = onChangeStatus;
			$scope.save = save;
			
			function onChangeOwner(owner) 
			{
				$scope.project.owner = owner;
			};

			function onChangeStatus(status) 
			{
				$scope.project.status = status;
			};
			
			function save() {
				
			};
		};
})();
