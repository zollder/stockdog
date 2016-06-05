'use strict';

/**
 * @ngdoc service
 * @name stockdogApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockdogApp.
 */
angular.module('stockdogApp')

/*
	Register the service with the top-level AngularJS application.
	Reference the service by injecting its name into the desired component implementtion function.
	AngularJS will instantiate a singleton by calling "new" on this function

	TODO: rewrite the service to call REST backend 
*/
.service('WatchlistService', function WatchlistService() {


	// [1] Helper: Load watchlists from localStorage
	var loadModel = function() {
		var model = {
			watchlists: localStorage['stockdog.watchlists'] ? JSON.parse(localStorage['stockdog.watchlists']) : [],
			nextId: localStorage['stockdog.nextId'] ? parseInt(localStorage['stockdog.nextId']) : 0
		};
		return model;
	};

	// [2] Helper: Save watchlists to localStorage
	var saveModel = function() {
		localStorage['stockdog.watchlists'] = JSON.stringify(Model.watchlists);
		localStorage['stockdog.nextId'] = Model.nextId;
	};

	// [3] Helper: Use lodash to find a watchlist with given ID
	var findById = function(listId) {
		return _.find(Model.watchlists,
			function(watchlist) {
				return watchlist.id === parseInt(listId);
			}
		);
	};

	// [4] Return all watchlists or find by given ID
	this.query = function(listId) {
		if (listId) {
			return findById(listId);
		} else {
			return Model.watchlists;
		}
	};

	// [5] Save a new watchlist to watchlists model
	this.save = function(watchlist) {
		watchlist.id = Model.nextId++;
		Model.watchlists.push(watchlist);
		saveModel();
	};

	// [6] Remove given watchlist from watchlists model
	this.remove = function(watchlist) {
		_.remove(Model.watchlists,
			function(list) {
				return list.id === watchlist.id;
			}
		);
		saveModel();
	};

	// [7] Initialize Model for this singleton service
	var Model = loadModel();
});
