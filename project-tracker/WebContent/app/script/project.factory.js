(function() {
	'use strict';

	angular.module('factory.module').factory('ProjectFactory', ProjectFactory);

	ProjectFactory.$inject = [ '$q', '$log', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'BaseFactory' ];

	function ProjectFactory($q, $log, $firebaseAuth, $firebaseArray, $firebaseObject, BaseFactory) {
		var factory = {};

		factory.initializeProjects = init;
		factory.findAll = findAll;
		factory.findById = findById;
		factory.save = save;
		factory.create = create;

		function findAll() 
		{
			return $firebaseArray(BaseFactory.PROJECT_REF).$loaded();
		};

		function findById(id) 
		{
			return $firebaseObject(BaseFactory.PROJECT_REF.child(id)).$loaded();
		};

		function save(project) {
			var deferred = $q.defer();
			
			findById(project.$id).then(function(proj){
				proj.name = project.name,
				proj.code = project.code,
				proj.owner = BaseFactory.convertResourceToJson(project.owner);
				proj.status =  BaseFactory.convertStatusToJson(project.status);
				summary : BaseFactory.getValue(project.summary, "");
			});
			
			return deferred.promise;
		};

		function create(project) 
		{
			var proj = BaseFactory.convertToProjectJson(project);
			var projId = BaseFactory.createProjectId();
			BaseFactory.PROJECT_REF.child(projId).set(proj);
			return findById(projId);
		};
		
		function init(projects) {
			$firebaseObject(BaseFactory.PROJECT_REF).$remove().then(function(ref) {
				angular.forEach(projects, function(project){
					var prj = convertToJson(project);
					BaseFactory.PROJECT_REF.child(BaseFactory.createProjectId()).set(prj);
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
