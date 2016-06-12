'use strict';

/**
 * @ngdoc directive
 * @name stockdogApp.directive:stkStockTable
 * @description
 * # stkStockTable
 */
angular.module('stockdogApp')

.directive('stkStockTable', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/templates/stock-table.html',
		scope: { watchlist: '=' },	// Isolate scope to watchlist object

		// Create a controller, which serves as an API for this directive
		controller: function($scope) {
			var rows = [];
			
			$scope.$watch('showPercent', function (showPercent) {
				if (showPercent) {
					_.each(rows, function (row) {
						row.showPercent = showPercent;
					});
				}
			});

			this.addRow = function(row) {
				rows.push(row);
			};

			this.removeRow = function(row) {
				_.remove(rows, row);
			};
		},

		// Standard link function implementation
		link: function($scope) {
			$scope.showPercent = false;
			$scope.removeStock = function (stock) {
				$scope.watchlist.removeStock(stock);
			};
		}
	};
});
