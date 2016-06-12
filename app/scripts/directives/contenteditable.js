'use strict';

/**
 * @ngdoc directive
 * @name stockdogApp.directive:contenteditable
 * @description
 * # contenteditable
 * Implements a directive that allows inline form editing. 
 * Performs sanitization and validation of user‐inputted data.
 */

var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;

angular.module('stockdogApp')

.directive('contenteditable', function($sce) {
	return {
		/* is restricted to an attribute */
		restrict: 'A',

		/*
			Grabs a handle on an external directive’s controller.
			Allows bidirectional data binding to trigger updates to the rest of the table
			based on the user’s modifications.
		*/
		require: 'ngModel',

		link: function postLink($scope, $element, $attrs, ngModelCtrl) {
			// do nothing if no ng-model
			if (!ngModelCtrl) {
				return;
			}

			/*
				Informs the ngModel directive how the view should be updated.
				Strict Contextual Escaping ($sce) is used to sanitize user input before updating HTML view.
			*/
			ngModelCtrl.$render = function() {
				$element.html($sce.getTrustedHtml(ngModelCtrl.$viewValue || ''));
			};

			/*
				Read HTML value, and then write data to the model or reset the view.
				Tests to see if the value is a number using a regular expression.
				If the current value is not a number, the view is updated with the previous value.
			*/
			var read = function() {
				var value = $element.html();
				if ($attrs.type === 'number' && !NUMBER_REGEXP.test(value)) {
					ngModelCtrl.$render();
				} else {
					ngModelCtrl.$setViewValue(value);
				}
			};

			/* 
				Add custom parser-based input type (only 'number' supported)
				This will be applied to the $modelValue
			*/
			if ($attrs.type === 'number') {
				ngModelCtrl.$parsers.push(
					function(value) {
						return parseFloat(value);
					}
				);
			}

			/*
				Listen for the change events (blur & keyup) and invoke read() after each modification.
				Enables binding.
			*/
			$element.on('blur keyup change',
				function() {
					$scope.$apply(read);
				}
			);
		}
	};
});
