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
		.state('login', 
		{
        	url:'/login',
    		templateUrl: 'app/login.html',
    		controller: 'LoginController'
		})
		.state('registration', 
		{
        	url:'/register',
    		templateUrl: 'app/register.html',
    		controller: 'RegistrationController'
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
        		project : function(statusTypes) {
        			var start = moment.utc().milliseconds(0).seconds(0).minutes(0).hours(0).valueOf(0);
        			var end = moment(angular.copy(start)).add(30, 'days').valueOf(0);
        			
        			var project = {
        				name : "",
        				code : "",
        				owner : {},
        				start : {
        					projected : start,
        					actual : -1
        				},
        				end : {
        					projected : end,
        					actual : -1
        				},
        				status : statusTypes.GREEN
        			};
        				
        			return project;
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

