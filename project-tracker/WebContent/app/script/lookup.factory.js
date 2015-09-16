(function() {
	'use strict';

	angular.module('factory.module').factory('LookupFactory', LookupFactory);

	LookupFactory.$inject = [ '$q', '$log', '$firebaseObject', '$firebaseArray', 'BaseFactory' ];

	function LookupFactory($q, $log, $firebaseObject, $firebaseArray, BaseFactory) {
		var factory = angular.extend(BaseFactory, {});

		factory.getStatusTypes = getStatusTypes;
		factory.getRoleTypes = getRoleTypes;

		function getStatusTypes() 
		{
			var deferred = $q.defer();

			$firebaseArray(factory.STATUS_TYPE_REF).$loaded().then(function(lookupType) {
				deferred.resolve(lookupType);
			}, function(err){
				$log.debug("Status Type lookup failed");
				deferred.reject(err);
			});
			
			return deferred.promise;
		};

		function getRoleTypes() 
		{
			return $firebaseArray(factory.ROLE_TYPE_REF).$loaded();
		};

		return factory;
	};
})();
