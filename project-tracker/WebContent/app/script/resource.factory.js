(function() {
	'use strict';

	angular.module('factory.module').factory('ResourceFactory', ResourceFactory);

	ResourceFactory.$inject = [ '$q', '$log', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'BaseFactory' ];

	function ResourceFactory($q, $log, $firebaseAuth, $firebaseArray, $firebaseObject, BaseFactory) {
		var factory = angular.extend(BaseFactory, {});
		
		factory.initializeResources = init;
		factory.findAll = findAll;
		factory.findById = findById;
		factory.save = save;

		function findById(id) 
		{
			return $firebaseObject(factory.RESOURCE_REF.child(id)).$loaded();
		};

		function findAll() 
		{
			return $firebaseArray(factory.RESOURCE_REF).$loaded();
		};

		function save(resource) {
			var deferred = $q.defer();


			return deferred.promise;
		};
				
		function init(resources) {
			$firebaseObject(factory.RESOURCE_REF).$remove().then(function(ref) {
				angular.forEach(resources, function(resource){
					var rsc = convertToJson(resource);
					factory.RESOURCE_REF.child(factory.createResourceId()).set(rsc);
				});
			}, function(error) {
				console.log("Error:", error);
			});
		}

		function convertToJson(resource) {
			var json = {
				firstName : resource.firstName,
				lastName : resource.lastName,
				middleInitial : factory.getValue(resource.middleInitial, ""),
				role: factory.getValue(resource.role, "USER")
			};

			return json;
		}

		return factory;
	}
	;
})();
