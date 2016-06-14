'use strict';

/**
 * @ngdoc directive
 * @name stockdogApp.directive:stkSignFade
 * @description
 * # stkSignFade
 * Implements a crossfade of changing table cell to show the price action of a given stock.
 */
angular.module('stockdogApp')
.directive('stkSignFade', function($animate) {
	return {
		restrict: 'A',

		link: function postLink($scope, $element, $attrs) {
			// keep reference to the old values to compare it to subsequent changes
			var oldVal = null;

			// Use $observe watch for changes to the expression assigned to stkSignFade
			$attrs.$observe('stkSignFade', function(newVal) {
				if (oldVal && oldVal === newVal) {
					return;
				}

				var oldPrice = parseFloat(oldVal);
				var newPrice = parseFloat(newVal);
				oldVal = newVal;

				/*
					Add the appropriate direction class to the directive's element,
					and remove it after animation (in a callback function).
				*/
				if (oldPrice && newPrice) {
					var direction = newPrice - oldPrice >= 0 ? 'up' : 'down';
					$animate.addClass($element, 'change-' + direction).then(
						function() {
							$animate.removeClass($element, 'change-' + direction);
						}
					);
				}
			});
		}
	};
});
