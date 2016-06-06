'use strict';

/**
 * @ngdoc directive
 * @name stockdogApp.directive:stkWatchlistPanel
 * @description
 * # stkWatchlistPanel
 */
angular.module('stockdogApp')

// [1] Register directive and inject dependencies
.directive('stkWatchlistPanel', function($location, $modal, $routeParams, WatchlistService) {
	return {
		templateUrl: 'views/templates/watchlist-panel.html',
		restrict: 'E',	// use as element only
		scope: {},		// isolate the scope of attached variables to the directive's context
		link: function($scope) {

			// keeps track of the current watchlist being displayed
			$scope.currentList = $routeParams.listId;

			// redirects to the desired watchlist view based on specified watchlist ID
			$scope.gotoList = function(listId) {
				$location.path('watchlist/' + listId);
			};

			// [2] Initialize variables
			$scope.watchlist = {};

			var addListModal = $modal({
				scope: $scope,
				template: 'views/templates/addlist-modal.html',
				show: false
			});

			// [3] Bind model from service to this scope
			$scope.watchlists = WatchlistService.query();

			// [4] Display addlist modal
			$scope.showModal = function() {
				addListModal.$promise.then(addListModal.show);
			};

			// [5] Create a new list from fields in modal
			$scope.createList = function() {
				WatchlistService.save($scope.watchlist);
				addListModal.hide();
				$scope.watchlist = {};
			};

			// [6] Delete desired list and redirect to home
			$scope.deleteList = function(list) {
				WatchlistService.remove(list);
				$location.path('/');
			};
		}
	};
});
