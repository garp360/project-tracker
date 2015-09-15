(function() {
	'use strict';

	angular.module('factory.module').factory('ResourceFactory', ResourceFactory);

	ResourceFactory.$inject = [ '$q', '$log', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'BaseFactory' ];

	function ResourceFactory($q, $log, $firebaseAuth, $firebaseArray, $firebaseObject, BaseFactory) {
		var factory = {};
		
		factory.initializeResources = init;
		factory.findAll = findAll;
		factory.findById = findById;
		factory.save = save;

		function findById(id) 
		{
			return $firebaseObject(BaseFactory.RESOURCE_REF.child(id)).$loaded();
		};

		function findAll() 
		{
			return $firebaseArray(BaseFactory.RESOURCE_REF).$loaded();
		};

		function save(resource) {
			var deferred = $q.defer();
			
			findById(resource.$id).then(function(rsc){
				rsc.firstName = resource.firstName;
				rsc.lastName = resource.firstName;
				rsc.middleInitial = BaseFactory.getValue(resource.middleInitial, "");
				role: BaseFactory.getValue(resource.role, "USER")
			});
			
			return deferred.promise;
		};

		function create(resource) 
		{
			var rsc = convertToJson(resource);
			var rscId = BaseFactory.createResourceId();
			BaseFactory.RESOURCE_REF.child(BaseFactory.createResourceId()).set(rsc);
			return findById(rscId);
		};
				
		function init(resources) {
			$firebaseObject(BaseFactory.RESOURCE_REF).$remove().then(function(ref) {
				angular.forEach(resources, function(resource){
					var rsc = convertToJson(resource);
					BaseFactory.RESOURCE_REF.child(BaseFactory.createResourceId()).set(rsc);
				});
			}, function(error) {
				console.log("Error:", error);
			});
		}

		function convertToJson(resource) {
			var json = {
				firstName : resource.firstName,
				lastName : resource.lastName,
				middleInitial : BaseFactory.getValue(resource.middleInitial, ""),
				role: BaseFactory.getValue(resource.role, "USER")
			};

			return json;
		}

		return factory;
	}
	;
})();
