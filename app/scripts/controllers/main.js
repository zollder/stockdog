'use strict';

/**
 * @ngdoc function
 * @name stockdogApp.controller:MainCtrl
 * @description
 * # MainCtrl Controller of the stockdogApp
 * Forces AngularJS to load the MainCtrl controller used for logic that should be applied regardless
 * of the current evaluated route. Encapsulatea application‐wide logic into a single controller.
 */
angular.module('stockdogApp')

.controller('MainCtrl', function($scope, $location, WatchlistService) {
	// [1] Populate watchlists for dynamic nav links
	$scope.watchlists = WatchlistService.query();

	/*
		[2] Using the $location.path() function as a $watch expression:
		- watches the value returned by the 1st function for changes
		- invokes the callback on each change
	*/
	$scope.$watch(
		// retrieves the location path
		function() {
			return $location.path();
		},
		// callback function: updates the $scope.activeView variable using _.contains from lodash
		// used to add and active class to the navigation bar
		function(path) {
			if (_.includes(path, 'watchlist')) {
				$scope.activeView = 'watchlist';
			} else {
				$scope.activeView = 'dashboard';
			}
		}
	);
});
