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
		factory.create = create;

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
				rsc.role =  BaseFactory.getValue(resource.role, "USER");
				rsc.contactInfo.email = BaseFactory.getValue(resource.contactInfo.email, "");
				rsc.contactInfo.phone = BaseFactory.getValue(resource.contactInfo.phone, "");
			});
			
			return deferred.promise;
		};

		function create(resource) 
		{
			var rsc = BaseFactory.convertResourceToJson(resource);
			var rscId = BaseFactory.createResourceId();
			BaseFactory.RESOURCE_REF.child(BaseFactory.createResourceId()).set(rsc);
			return findById(rscId);
		};
				
		function init(resources) {
			$firebaseObject(BaseFactory.RESOURCE_REF).$remove().then(function(ref) {
				angular.forEach(resources, function(resource){
					var rsc = BaseFactory.convertResourceToJson(resource);
					BaseFactory.RESOURCE_REF.child(BaseFactory.createResourceId()).set(rsc);
				});
			}, function(error) {
				console.log("Error:", error);
			});
		}

		return factory;
	}
	;
})();
