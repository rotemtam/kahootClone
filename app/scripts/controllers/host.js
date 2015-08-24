'use strict';

/**
 * @ngdoc function
 * @name kahootCloneApp.controller:HostCtrl
 * @description
 * # HostCtrl
 * Controller of the kahootCloneApp
 */
angular.module('kahootCloneApp')
  .controller('HostCtrl', function ($scope, Host, $routeParams,fbutil) {

  	Host.init($routeParams.PIN)
  	.then(function() {
  		Host.syncObject.$bindTo($scope, 'game');
  	});

  	$scope.startGame = function() {
  		$scope.game.data.state = 'preQuestion'
  		$scope.coundown = 5;
  	};


  });
