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
    		controller: function($scope, $log, ResourceFactory, ProjectFactory) {
    			
    			$scope.initalizeResources = initResources;
    			$scope.initalizeProjects = initProjects;

    			function initProjects() {
    				var defaultProjects = [];
    				
    				defaultProjects.push(getProject("NAVAIR", "NAVAIR", getResource("Garth", "Pidcock", "J", "MANAGER"), 1439006400000,1439006400000,1469937600000,-1,"GREEN"));
    				
    				ProjectFactory.initializeProjects(defaultProjects);
    			}
    			
    			function initResources() {
    				var defaultResources = [];
        			defaultResources.push(getResource("Garth", "Pidcock", "J", "MANAGER"))
        			defaultResources.push(getResource("Randy", "Bouquet", "", "MANAGER"))
        			defaultResources.push(getResource("Kevin", "Criss", "", "MANAGER"))
        			defaultResources.push(getResource("Bishwas", "Khanal", "", "MANAGER"))
        			defaultResources.push(getResource("Brady", "Hustad", "", "MANAGER"))
        			
    				ResourceFactory.initializeResources(defaultResources);
    			}
    			
    			function getResource(fn, ln, mi, role) {
    				var rsc = {
    					firstName: fn,
    					lastName: ln,
    					middleInitial: mi,
    					role: role
    				}
    				
    				return rsc;
    			}
    			
    			function getProject(name, code, owner, pStart, aStart, pEnd, aEnd, status) {
    				var json = {
    					name : name,
    					code : code,
    					owner : owner,
    					start : {
    						projected : pStart,
    						actual : aStart
    					},
    					end : {
    						projected : pEnd,
    						actual : aEnd
    					},
    					status : status
    				};

    				return json;
    			}
    		}
		});
		
	}]); 
	
})();

