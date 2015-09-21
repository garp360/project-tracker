(function() {
	'use strict';
	angular
		.module('astadia.trax', ['ui.router', 'ngMessages', 'ngMaterial', 'firebase', 'controller.module', 'factory.module', 'directive.module'])
		
		.config(function ($mdThemingProvider) {
			var appPrimaryPalette = $mdThemingProvider.extendPalette('blue-grey', {
				'A400': '070707'
			});
			var appBkgPalette = $mdThemingProvider.extendPalette('grey', {
			    '900': '131313'
			  });
			$mdThemingProvider.definePalette('appPrimaryPalette', appPrimaryPalette);
			$mdThemingProvider.definePalette('appBkgPalette', appBkgPalette);
			$mdThemingProvider
			    .theme('default')
			    .primaryPalette('appPrimaryPalette', {
			    	'default': 'A400',
			        'hue-1': '800',
			        'hue-2': '600',
			        'hue-3': '400'
			    })
			    .accentPalette('blue')
			    .warnPalette('red')
			    .backgroundPalette('appBkgPalette', {
			    	'default': '900',
			        'hue-1': '800',
			        'hue-2': '600',
			        'hue-3': '400'
			    }).dark();
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