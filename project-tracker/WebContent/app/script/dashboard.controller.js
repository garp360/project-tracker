(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('DashboardController', DashboardController);
    	DashboardController.$inject = ['$scope', '$log', 'projects'];
    	
    	function DashboardController ($scope, $log, projects) {
    		$scope.projects = projects;
		};
})();
