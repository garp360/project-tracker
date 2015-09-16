(function() {
    'use strict';

    angular
    	.module('factory.module')
    	.factory('BaseFactory', BaseFactory); 
    	
    	function BaseFactory ($q, $log) 
    	{
    		var factory = {};
    		var projectIdPrefix = "prj";
    		var resourceIdPrefix = "rsc";
    		
    		factory.AUTH_REF = new Firebase("https://astadia-trax.firebaseio.com");
    		factory.USER_REF = new Firebase("https://astadia-trax.firebaseio.com/users");
			factory.PROJECT_REF = new Firebase("https://astadia-trax.firebaseio.com/projects");
			factory.RESOURCE_REF = new Firebase("https://astadia-trax.firebaseio.com/resources");
			factory.STATUS_TYPE_REF = new Firebase("https://astadia-trax.firebaseio.com/lookups/statusType");
			factory.ROLE_TYPE_REF = new Firebase("https://astadia-trax.firebaseio.com/lookups/roleType");
			factory.PROJECT_ID_PREFIX = projectIdPrefix;
			factory.RESOURCE_ID_PREFIX = resourceIdPrefix;
			
			factory.getValue = getValue;
			factory.createProjectId = createProjectGuid;
			factory.createResourceId = createResourceGuid;
			factory.convertResourceToJson = convertResourceToJson;
			factory.convertProjectToJson = convertProjectToJson;
			factory.convertRoleToJson = convertRoleToJson;
			factory.convertStatusToJson = convertStatusToJson;
			
			function getValue(value, defaultValue) 
			{
				var result = defaultValue;
				if(value) 
				{
					result = value; 
				} 
				return result;
			};
			
			function createProjectGuid() 
			{
				var guid = createGuid();
				return projectIdPrefix + "-" + guid;
			}
			
			function createResourceGuid() 
			{
				var guid = createGuid();
				return resourceIdPrefix + "-" + guid;
			}
			
			function createGuid()
			{
			    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
			        return v.toString(16);
			    });
			}
			
			function getResource(fn, ln, mi, role) {
				var rsc = {
					firstName: fn,
					lastName: ln,
					middleInitial: mi,
					role: role
				};
				
				return rsc;
			}
			
			function getProject(owner) {
				
				var start = moment.utc().milliseconds(0).seconds(0).minutes(0).hours(0).valueOf(0);
				var end = moment(angular.copy(start)).add(30, 'days').valueOf(0);;
				
				var json = {
					name : name,
					code : code,
					owner : owner,
					start : {
						projected : start,
						actual : -1
					},
					end : {
						projected : end,
						actual : -1
					},
					status : status
				};

				return json;
			};
			
			function convertProjectToJson(project) {
				var json = {
					name : project.name,
					code : project.code,
					owner : convertResourceToJson(project.owner),
					status : convertStatusToJson(project.status),
					summary : project.summary
				};

				return json;
			}
			
			function convertResourceToJson(resource) {
				var json = {
					firstName : resource.firstName,
					lastName : resource.lastName,
					middleInitial : getValue(resource.middleInitial, ""),
					role: convertRoleToJson(resource.role),
					contactInfo : {
						email: getValue(resource.contactInfo.email, ""),
						phone: getValue(resource.contactInfo.phone, "")
					}
				};

				return json;
			}

			function convertRoleToJson(role) {
				var json = {
					name : role.name,
					order : role.order
				};
				
				return json;
			}

			function convertStatusToJson(status) {
				var json = {
						name : status.name,
						color : status.color,
						order : status.order
				};
				
				return json;
			}
			
			
			return factory;
    	};
})();