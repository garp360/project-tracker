(function() {
    'use strict';

    angular
    	.module('factory.module')
    	.factory('BaseFactory', BaseFactory); 
    	
    	function BaseFactory ($q, $log) 
    	{
    		var factory = {};
    		
    		factory.AUTH_REF = new Firebase("https://astadia-trax.firebaseio.com");
			factory.PROJECT_REF = new Firebase("https://astadia-trax.firebaseio.com/projects");
			factory.RESOURCE_REF = new Firebase("https://astadia-trax.firebaseio.com/resources");
			
			factory.getValue = getValue;
			factory.createGuid = createGuid;
			
			function getValue(value, defaultValue) 
			{
				var result = defaultValue;
				if(value) 
				{
					result = value; 
				} 
				return result;
			};
			
			function createGuid()
			{
			    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
			        return v.toString(16);
			    });
			}
			
			return factory;
    	};
})();