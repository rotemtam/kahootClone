'use strict';

/**
 * @ngdoc function
 * @name kahootCloneApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the kahootCloneApp
 */
angular.module('kahootCloneApp')
  .controller('PlayerCtrl', function ($scope, Player, $location,$routeParams) {
  	if(! $routeParams.hasOwnProperty('PIN')) {
  		$scope.game = {
  			data : {
  				state: 'joinGame'
  			}
  			
  		}
  	} else {
  		Player.init($routeParams.PIN)
  		.then(function() {
  			Player.syncObject.$bindTo($scope,'game');
        $scope.playerId = Player.getUniqId();
  		});
  	}

    $scope.join = function() {
    	$scope.joining = true;
    	Player.join($scope.PIN, $scope.screenName)
    	.then(function() {
    		$location.path('/player/' + $scope.PIN)
    	});
    };

  });
