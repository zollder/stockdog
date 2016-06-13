'use strict';

/**
 * @ngdoc directive
 * @name stockdogApp.directive:stkSignColor
 * @description
 * # stkSignColor
 * Implements a directive that modifies the color of existing elements to be either red or green.
 */
angular.module('stockdogApp')

.directive('stkSignColor', function() {
	return {
		restrict: 'A',
		link: function postLink($scope, $element, $attrs) {
			// Use $observe to watch expression for changes
			$attrs.$observe('stkSignColor', function(newVal) {
				var newSign = parseFloat(newVal);
				if (newSign > 0) {
					$element[0].style.color = 'Green';
				} else {
					$element[0].style.color = 'Red';
				}
			});
		}
	};
});
