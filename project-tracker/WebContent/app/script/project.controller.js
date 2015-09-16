(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('ProjectController', ProjectController);
    	ProjectController.$inject = ['$scope', '$log', '$controller', '$state', '$firebaseAuth', 'ProjectFactory', 'statusTypes', 'resources', 'project', 'projectCopy', 'loggedInUser'];
    	
    	function ProjectController ($scope, $log, $controller, $state, $firebaseAuth, ProjectFactory, statusTypes, resources, project, projectCopy, loggedInUser) 
    	{
    		$scope.userInRole = loggedInUser != null; 

    		$scope.project = project;
    		
    		$scope.statusTypes = statusTypes;
    		$scope.resources = resources;

			$scope.onChangeOwner = onChangeOwner;
			$scope.onChangeStatus = onChangeStatus;
			$scope.save = save;
			$scope.clear = clear;
			
			function onChangeOwner(owner) 
			{
				$scope.project.owner = owner;
			};

			function onChangeStatus(status) 
			{
				$scope.project.status = status;
			};
			
			function save() {
				if($scope.project.$id) {
					ProjectFactory.save($scope.project);
				} else{
					ProjectFactory.create($scope.project);
				}
			};
		};
})();
