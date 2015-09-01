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
    			
    			$scope.arrows = {
			        year: {
			            left: 'vendor/mbdatepicker/images/white_arrow_left.svg',
			            right: 'vendor/mbdatepicker/images/white_arrow_right.svg'
			        },
			        month: {
			            left: 'vendor/mbdatepicker/images/grey_arrow_left.svg',
			            right: 'vendor/mbdatepicker/images/grey_arrow_right.svg'
			        }
			    }
    			
    			$scope.onChangeOwner = onChangeOwner;
    			$scope.onChangeStatus = onChangeStatus;
    			$scope.save = save;
    			
    			
    			function onChangeOwner(owner) {
    				$scope.project.owner = owner;
    			};

    			function onChangeStatus(status) {
    				$scope.project.status = status;
    			};
    			
    			function save() {
    				for ( var property in $scope.project) {
    					if ($scope.project.hasOwnProperty(property)) {
    						if(property === 'enddate' || property === 'startdate'){
    							logProperty($scope.project[property]);
    						} else {
    							$log.debug(property + " = [" + $scope.project[property] + "]");
    						}
    					}
    				}
    			};
    			
    			function logProperty(prop, value) {
					for ( var property in value) {
						if (value.hasOwnProperty(property)) {
							$log.debug(property + " = [" + value[property] + "]");
						}
					}
    				
    			}
    			
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

