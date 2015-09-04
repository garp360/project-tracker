(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('ProjectController', ProjectController);
    	ProjectController.$inject = ['$scope', '$log', '$controller', '$state', '$firebaseAuth', 'ProjectFactory', 'statusTypes', 'resources', 'project'];
    	
    	function ProjectController ($scope, $log, $controller, $state, $firebaseAuth, ProjectFactory, statusTypes, resources, project) {
    		
    		$scope.project = {};
    		$scope.statusTypes = statusTypes;
    		$scope.owners = resources;

    		$scope.currentOwner = $scope.owners[0];
    		$scope.currentStatus = $scope.statusTypes[0];

    		if(project) {
    			$scope.project = project;
    		} else {
    			
    		}

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
