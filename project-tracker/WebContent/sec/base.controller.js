(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('BaseController', BaseController);
    
    	BaseController.$inject = ['$scope', '$log', '$firebaseAuth', 'AuthFactory'];
    	
    	function BaseController ($scope, $log, $firebaseAuth, AuthFactory) {
			$scope.formatNameLF = function(user) 
			{
				var name = "";
				if (user) 
				{
					name = user.lastName + ", " + user.firstName;
				}
				return name;
			};
			
			$scope.formatNameFL = function(user) 
			{
				var name = "";
				if (user) 
				{
					name = user.firstName + " " + user.lastName;
				}
				return name;
			};
		
			$scope.formatDate = function(date) 
			{
				return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss A") + " (UTC " + moment(date).utcOffset() + ")";
			};

			$scope.formatEventDate = function(date) 
			{
				return moment(date).format("dddd, MMMM Do YYYY");
			};
    	};	
})();