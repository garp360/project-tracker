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
        	url:'/register/:email',
    		templateUrl: 'app/register.html',
    		controller: 'RegistrationController',
    		resolve : {
        		registration : function($stateParams){
        	          return {email: $stateParams.email};
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
        		loggedInUser: function(AuthorizationFactory){
        			return AuthorizationFactory.getUser();
        		},
        		statusTypes: function(LookupFactory) {
        			return LookupFactory.getStatusTypes();
        		},
        		defaultStatus : function(statusTypes) {
        			var defaultStatus = {};
        			if(statusTypes && statusTypes.length > 0) {
        				angular.forEach(statusTypes, function(statusType){
        					if("GREEN" === statusType.color.toUpperCase()) {
        						defaultStatus = statusType;
        					}
        				});
        			}
        			return defaultStatus;
        		},
        		resources: function(ResourceFactory) {
        			return ResourceFactory.findAll();
        		},
        		defaultOwner : function(loggedInUser, resources) {
        			var resourceMatch = {};
        			
        			if(resources && resources.length > 0) {
        				resourceMatch = resources[0];
        			
	        			for(var i=0; i<resources.length; i++) 
	        			{
	        				if(loggedInUser.lastName === resources[i].lastName) {
	        					resourceMatch = resources[i];
	        					if(loggedInUser.lastName === resources[i].lastName && loggedInUser.firstName === resources[i].firstName) {
	        						resourceMatch = resources[i];
	        						break;
	        					}
	        				}
	        			}
	        		}
        			
        			return resourceMatch;
        		},
        		project : function(statusTypes, loggedInUser, resources, defaultStatus, defaultOwner) {
        			var start = moment.utc().milliseconds(0).seconds(0).minutes(0).hours(0).valueOf(0);
        			var end = moment(angular.copy(start)).add(30, 'days').valueOf(0);
        			
        			var project = {
        				name : "",
        				code : "",
        				owner : defaultOwner,
        				start : {
        					projected : start,
        					actual : -1
        				},
        				end : {
        					projected : end,
        					actual : -1
        				},
        				status : defaultStatus
        			};
        				
        			return project;
        		}, 
        		projectCopy : function(project) {
        			return angular.copy(project);
        		}
        	}
		})
		.state('new-resource', 
		{
        	url:'/resources/new',
    		templateUrl: 'app/resource.html',
    		controller: 'ResourceController',
        	resolve : 
        	{
        		loggedInUser: function(AuthorizationFactory){
        			return AuthorizationFactory.getUser();
        		},
        		roles: function(LookupFactory) {
        			return LookupFactory.getRoleTypes();
        		},
        		resource: function(roles) {
        			return {
        				role: roles[0]
        			};
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

