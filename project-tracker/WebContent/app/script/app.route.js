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
		.state('init', 
		{
        	url:'/init',
    		templateUrl: 'app/init.html',
    		controller: 'DataController'
		});
		
	}]); 
	
})();

