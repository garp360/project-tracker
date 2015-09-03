(function() {
	'use strict';

	angular.module('factory.module').factory('ProjectFactory', ProjectFactory);

	ProjectFactory.$inject = [ '$q', '$log', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'BaseFactory' ];

	function ProjectFactory($q, $log, $firebaseAuth, $firebaseArray, $firebaseObject, BaseFactory) {
		var factory = angular.extend(BaseFactory, {});

		factory.initializeProjects = init;
		factory.findAll = findAll;
		factory.findById = findById;
		factory.save = save;

		function findAll() 
		{
			return $firebaseArray(factory.PROJECT_REF).$loaded();
		};

		function findById(id) 
		{
			return $firebaseObject(factory.PROJECT_REF.child(id)).$loaded();
		};

		function save(project) {
			var deferred = $q.defer();

			return deferred.promise;
		};
		
		function init(projects) {
			$firebaseObject(factory.PROJECT_REF).$remove().then(function(ref) {
				angular.forEach(projects, function(project){
					var prj = convertToJson(project);
					factory.PROJECT_REF.child(factory.createProjectId()).set(prj);
				});
			}, function(error) {
				console.log("Error:", error);
			});
		}

		function convertToJson(project) {
			var json = {
				name : project.name,
				code : project.code,
				owner : project.owner,
				start : {
					projected : project.start.projected,
					actual : project.start.actual
				},
				end : {
					projected : project.end.projected,
					actual : project.end.actual
				},
				status : project.status
			};

			return json;
		}

		return factory;
	};
})();
