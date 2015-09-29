(function() {
	'use strict';
	angular
		.module('astadia.trax', ['ui.router', 'ngMessages', 'ngMaterial', 'firebase', 'controller.module', 'factory.module', 'directive.module'])
		
		.config(function ($mdThemingProvider) {
			var appBkgPalette = $mdThemingProvider.extendPalette('grey', {
			    'A100': '131313',
			    'contrastDefaultColor': 'light',    // whether, by default, text (contrast) on this palette should be dark or light
				'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
				'200', '300', '400', 'A100'],
				'contrastLightColors': undefined    // could also specify this if default was 'dark'
			});
			
			$mdThemingProvider.definePalette('appBkgPalette', appBkgPalette);
			
			$mdThemingProvider
			    .theme('default').dark()
			    .primaryPalette('blue')
			    .accentPalette('blue')
			    .warnPalette('red')
			    .backgroundPalette('appBkgPalette');
			})
		
		.run(["$rootScope", "$location", function($rootScope, $location) {
			$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
			  // We can catch the error thrown when the $requireAuth promise is rejected
			  // and redirect the user back to the home page
			  if (error === "AUTH_REQUIRED") {
			    $location.path("/");
			  }
			});
		}]);
})();