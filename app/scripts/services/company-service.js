'use strict';

/**
 * @ngdoc service
 * @name stockdogApp.CompanyService
 * @description
 * # CompanyService
 * Service in the stockdogApp.
 */
angular.module('stockdogApp')

.service('CompanyService', function CompanyService($resource) {
	return $resource('companies.json');
});
