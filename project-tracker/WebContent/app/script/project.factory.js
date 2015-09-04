(function() {
	'use strict';

	angular.module('factory.module').factory('ProjectFactory', ProjectFactory);

	ProjectFactory.$inject = [ '$q', '$log', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'BaseFactory' ];

	function ProjectFactory($q, $log, $firebaseAuth, $firebaseArray, $firebaseObject, BaseFactory) {
		var factory = angular.extend(BaseFactory, {});

		factory.initializeProjects = init;
		factory.findAll = findAll;
		factory.findById = findById;
		factory.getDefaultProject = getDefaultProject;
		factory.save = save;

		function findAll() 
		{
			return $firebaseArray(factory.PROJECT_REF).$loaded();
		};

		function findById(id) 
		{
			return $firebaseObject(factory.PROJECT_REF.child(id)).$loaded();
		};

		function getDefaultProject(statusTypes) 
		{
			var start = moment.utc().milliseconds(0).seconds(0).minutes(0).hours(0).valueOf(0);
			var end = moment(angular.copy(start)).add(30, 'days').valueOf(0);
			
			var project = {
					name : "",
					code : "",
					owner : {},
					start : {
						projected : start,
						actual : -1
					},
					end : {
						projected : end,
						actual : -1
					},
					status : {}
				};
			
			return project;
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
