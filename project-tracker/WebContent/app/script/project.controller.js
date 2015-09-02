(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('ProjectController', ProjectController);
    	ProjectController.$inject = ['$scope', '$log', '$controller', '$state', '$firebaseAuth', 'ProjectFactory', 'statusList', 'owners', 'start', 'end'];
    	
    	function ProjectController ($scope, $log, $controller, $state, $firebaseAuth, ProjectFactory, statusList, owners, start, end) {
    		$scope.project = {};
			$scope.project.startDate = {};
			$scope.project.endDate = {};
			$scope.statusList = statusList;
			$scope.owners = owners;
			$scope.owner = $scope.owners[0];
			$scope.status = $scope.statusList[0];
			$scope.project.startDate.projected = start.format("dddd, MMMM Do YYYY");;
			$scope.project.startDate.actual = start.format("dddd, MMMM Do YYYY");;
			$scope.project.endDate.projected = end.format("dddd, MMMM Do YYYY");;
			$scope.project.endDate.actual = end.format("dddd, MMMM Do YYYY");
			
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
				
			};
			
			
			
			
		};
})();
