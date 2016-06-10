'use strict';

/**
 * @ngdoc function
 * @name stockdogApp.controller:WatchlistCtrl
 * @description
 * # WatchlistCtrl
 * Controller of the stockdogApp
 */
angular.module('stockdogApp')

.controller('WatchlistCtrl', function($scope, $routeParams, $modal, WatchlistService, CompanyService) {

	// initialize
	$scope.companies = CompanyService.query();	// #query() is provided by the service object (default)
	// make sure variable name != object constructor name
	$scope.wlist = WatchlistService.query($routeParams.listId);
	$scope.stocks = $scope.wlist.stocks;
	$scope.newStock = {};

	var addStockModal = $modal({
		scope: $scope,
		templateUrl: 'views/templates/addstock-modal.html',
		show: false
	});

	// [2] Expose showStockModal to view via $scope
	$scope.showStockModal = function() {
		addStockModal.$promise.then(addStockModal.show);
	};

	// Call the WatchlistModel addStock() function and hide the modal
	$scope.addStock = function() {
		var stock = {
			listId: $routeParams.listId,
			company: $scope.newStock.company,
			shares: $scope.newStock.shares
		};
		$scope.wlist.addStock(stock);
		addStockModal.hide();
		$scope.newStock = {};
	};
});
