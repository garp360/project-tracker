(function() {
	'use strict';
	
	angular.module('astadia.trax')
	
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) 
	{
		$urlRouterProvider.otherwise('/');
 
		$stateProvider
		
		.state('dashboard', 
		{
        	url:'/',
    		templateUrl: 'app/dashboard.html',
    		controller: 'DashboardController',
        	resolve : 
        	{
        		projects : function(ProjectFactory) 
        		{
        			return ProjectFactory.findAll();
        		}
        	}
		})
		.state('new-project', 
		{
        	url:'/projects/new',
    		templateUrl: 'app/project.html',
    		controller: 'ProjectController',
        	resolve : 
        	{
        		statusTypes: function(LookupFactory) {
        			return LookupFactory.getStatusTypes();
        		},
        		resources: function(ResourceFactory) {
        			return ResourceFactory.findAll();
        		},
        		project : function(ProjectFactory, statusTypes) 
        		{
        			return ProjectFactory.getDefaultProject(statusTypes);
        		}
        	}
		})
		.state('init', 
		{
        	url:'/init',
    		templateUrl: 'app/init.html',
    		controller: 'DataController'
		});
		
	}]); 
	
})();

