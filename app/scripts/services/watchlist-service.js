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

	/*----------------------------objects and models-------------------------*/
	/* 
		Create StockModel object with a #save() function.
		Improve Stocks with additional helper functions.
	*/
	var StockModel = {
		save: function() {
			var watchlist = findById(this.listId);
			watchlist.recalculate();
			saveModel();
		}
	};

	/* 
		Create WatchlistModel object with an #addStock(), #removeStock() and #recalculate() functions.
		Improve watchlists with additional helper functions.
	*/
	var WatchlistModel = {
		addStock: function(stock) {
			var existingStock = _.find(this.stocks, function(s) {
				return (s.company.symbol === stock.company.symbol);
			});

			if (existingStock) {
				existingStock.shares += stock.shares;
			} else {
				_.extend(stock, StockModel);
				this.stocks.push(stock);
			}

			this.recalculate();
			saveModel();
		},
		removeStock: function(stock) {
			_.remove(this.stocks, function(s) {
				return (s.company.symbol === stock.company.symbol);
			});
			this.recalculate();
			saveModel();
		},
		recalculate: function() {
			var calculations = _.reduce(
				this.stocks,
				function(calculations, stock) {
					calculations.shares += stock.shares;
					calculations.marketValue += stock.marketValue;
					calculations.dayChange += stock.dayChange;
					return calculations;
				},
				{
					shares: 0,
					marketValue: 0,
					dayChange: 0
				}
			);

			this.shares = calculations.shares;
			this.marketValue = calculations.marketValue;
			this.dayChange = calculations.dayChange;
		}
	};

	/*----------------------------functions-------------------------------------*/
	/*
		[1] Helper: Load watchlists from localStorage.
		Serializes and deserializes data from LocalStorage
	*/
	var loadModel = function() {
		var model = {
			watchlists: localStorage['stockdog.watchlists'] ? JSON.parse(localStorage['stockdog.watchlists']) : [],
			nextId: localStorage['stockdog.nextId'] ? parseInt(localStorage['stockdog.nextId']) : 0
		};
		_.each(
			model.watchlists,
			function(watchlist) {
				_.extend(watchlist, WatchlistModel);
				_.each(watchlist.stocks, function(stock) { _.extend(stock, StockModel); });
			}
		);
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
		watchlist.stocks = [];
		_.extend(watchlist, WatchlistModel);
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
