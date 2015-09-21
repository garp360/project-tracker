(function() {
    'use strict';

    angular
    	.module('directive.module')
    	.directive('projectStatus', function() {
    		return {
				restrict: 'AE',
				replace: 'true',
				scope: { project: '=' },
			    templateUrl: 'app/template/project-status.tpl.html',
			    link: function(scope)  { }
    		};
    	});
})();