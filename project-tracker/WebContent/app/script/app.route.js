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
    		controller: 'ProjectController',
        	resolve : 
        	{
        		statusList : function() 
        		{
        			return [{name: 'GOOD',    color : 'GREEN',  order : 10},                  
        					{name: 'WARNING', color : 'YELLOW', order : 50},
        					{name: 'TROUBLE', color : 'RED',    order : 100} ];
        		},
        		owners : function() 
        		{
        			return [ {name: 'Bishwas'},
        			         {name: 'Hustad, Brady'},
        			         {name: 'Boquet, Randy'},
        			         {name: 'Pidcock, Garth'} 
        			];
        		},
        		start : function() {
        			return moment().startOf('week');
        		},
        		end : function(start) {
        			var startDate = angular.copy(start);
        			return startDate.add(14, 'days');
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

