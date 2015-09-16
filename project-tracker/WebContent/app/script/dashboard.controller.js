(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('DashboardController', DashboardController);
    	DashboardController.$inject = ['$scope', '$log', '$state', 'projects'];
    	
    	function DashboardController ($scope, $log, $state, projects) 
    	{
    		$scope.projects = projects;
    		$scope.goToProject = goToProject;
    	
    		function goToProject(projectId) 
    		{
    			$state.go('edit-project', {'projectId' : projectId});
    		}
    	
    	};
		
		
})();
