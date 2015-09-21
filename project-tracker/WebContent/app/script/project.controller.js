(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('ProjectController', ProjectController);
    	ProjectController.$inject = ['$scope', '$log', '$controller', '$mdDialog', '$state', '$firebaseAuth', 'ProjectFactory', 'statusTypes', 'resources', 'project', 'loggedInUser'];
    	
    	function ProjectController ($scope, $log, $controller, $mdDialog, $state, $firebaseAuth, ProjectFactory, statusTypes, resources, project, loggedInUser) 
    	{
    		$scope.userInRole = loggedInUser != null; 

    		$scope.project = project;
    		
    		$scope.currentResource = syncResource($scope.project, resources);
    		$scope.currentStatus = syncStatus($scope.project, statusTypes);

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
			
			function save(ev) 
			{
				if($scope.project.$id) 
				{
					ProjectFactory.save($scope.project);
					$state.reload();
				} 
				else
				{
					ProjectFactory.create($scope.project);
					$state.go('dashboard');
				}
			};

			function clear() 
			{
				$state.reload();
			}
			
			function syncStatus(proj, statusTypes) 
			{
				for(var i=0; i<statusTypes.length; i++)
				{
					if(proj.status.color === statusTypes[i].color)
					{
						proj.status = statusTypes[i];
						break;
					}
				}
			}

			function syncResource(proj, resources) 
			{
				for(var i=0; i<resources.length; i++)
				{
					if(proj.owner.contactInfo.email === resources[i].contactInfo.email)
					{
						proj.owner = resources[i];
						break;
					}
				}
			}
			
//			function showSuccess(ev, message) {
//			    // Appending dialog to document.body to cover sidenav in docs app
//			    // Modal dialogs should fully cover application
//			    // to prevent interaction outside of dialog
//			    $mdDialog.show(
//			      $mdDialog.alert()
//			        .parent(angular.element(document.querySelector('#appContainer')))
//			        .clickOutsideToClose(true)
//			        .title('Success!')
//			        .content(message)
//			        .ariaLabel('Success: ' + message)
//			        .ok('Got it!')
//			        .targetEvent(ev)
//			    );
//			  };
		};
})();
