(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('DataController', DataController);
    	DataController.$inject = ['$scope', '$log', 'ResourceFactory', 'ProjectFactory'];
    	
    	function DataController($scope, $log, ResourceFactory, ProjectFactory) 
    	{
			$scope.initalizeResources = initResources;
			$scope.initalizeProjects = initProjects;

			function initProjects() 
			{
				var defaultProjects = [];
				
				defaultProjects.push(getProject("NAVAIR", "NAVAIR", getResource("Garth", "Pidcock", "J", "MANAGER"), 1439006400000,1439006400000,1469937600000,-1, getStatus("GREEN", "GOOD", 10)));
				
				ProjectFactory.initializeProjects(defaultProjects);
			}
			
			function initResources() 
			{
				var defaultResources = [];
    			defaultResources.push(getResource("Garth", "Pidcock", "J", "MANAGER"));
    			defaultResources.push(getResource("Randy", "Bouquet", "", "MANAGER"));
    			defaultResources.push(getResource("Kevin", "Criss", "", "MANAGER"));
    			defaultResources.push(getResource("Bishwas", "Khanal", "", "MANAGER"));
    			defaultResources.push(getResource("Brady", "Hustad", "", "MANAGER"));
    			
				ResourceFactory.initializeResources(defaultResources);
			}
			
			function getStatus(color, name, order) 
			{
				var status = {
					color: color,
					name: name,
					order: order
				};
				
				return status;
			}
			
			function getResource(fn, ln, mi, role) 
			{
				var rsc = {
						firstName: fn,
						lastName: ln,
						middleInitial: mi,
						role: role
				};
				
				return rsc;
			}
			
			function getProject(name, code, owner, pStart, aStart, pEnd, aEnd, status) 
			{
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
			};
		};
})();
