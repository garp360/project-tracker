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
    		controller: function($scope, $log, statusList, owners, start, end) {
    			$scope.project = {};
    			$scope.project.startdate = {};
    			$scope.project.enddate = {};
    			$scope.statusList = statusList;
    			$scope.owners = owners;
    			$scope.owner = $scope.owners[0];
    			$scope.status = $scope.statusList[0];
    			$scope.project.startdate.projected = start.format("dddd, MMMM Do YYYY");;
    			$scope.project.startdate.actual = start.format("dddd, MMMM Do YYYY");;
    			$scope.project.enddate.projected = end.format("dddd, MMMM Do YYYY");;
    			$scope.project.enddate.actual = end.format("dddd, MMMM Do YYYY");
    			
    			function onChangeOwner(owner) {
    				$scope.project.owner = owner;
    			};

    			function onChangeStatus(status) {
    				$scope.project.status = status;
    			};
    			
    			function save() {
    				$log.debug(project.toString());
    			};
    		},
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
		});
//		.state('project', 
//		{
//        	url:'/project',
//    		templateUrl: 'project.html',
//    		controller: 'ProjectController',
//        	resolve : 
//        	{
//        		statusList : function() 
//        		{
//        			return ['RED', 'GREEN', 'YELLOW'];
//        		}
//        	}
//		});
		
	}]); 
	
})();

