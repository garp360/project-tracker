(function() {
	'use strict';

	angular.module('factory.module').factory('LookupFactory', LookupFactory);

	LookupFactory.$inject = [ '$q', '$log', '$firebaseObject', 'BaseFactory' ];

	function LookupFactory($q, $log, $firebaseObject, BaseFactory) {
		var factory = angular.extend(BaseFactory, {});

		factory.getStatusTypes = getStatusTypes;
		factory.getRoleTypes = getRoleTypes;

		function getStatusTypes() 
		{
			var deferred = $q.defer();

			$firebaseObject(factory.STATUS_TYPE_REF).$loaded().then(function(lookupType) {
				deferred.resolve(lookupType);
			}, function(err){
				$log.debug("Status Type lookup failed");
				deferred.reject(err);
			});
			
			return deferred.promise;
		};

		function getRoleTypes() 
		{
			var deferred = $q.defer();
			
			$firebaseObject(factory.ROLE_TYPE_REF).$loaded().then(function(lookupType) {
				deferred.resolve(lookupType);
			}, function(err){
				$log.debug("Role Type lookup failed");
				deferred.reject(err);
			});
			
			return deferred.promise;
		};

		return factory;
	};
})();
