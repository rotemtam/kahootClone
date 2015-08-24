'use strict';

/**
 * @ngdoc function
 * @name kahootCloneApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kahootCloneApp
 */
angular.module('kahootCloneApp')
  .controller('MainCtrl', function ($scope, $location, _, fbutil) {
    
  	$scope.newGame = function() {
  		$scope.creatingGame = true;

  		// Generate random 6 digit pincode for the game
  		var PIN = _.random(100000,999999),

  		// Connect to Firebase
  		game = fbutil.syncObject('games/' + PIN);

  		// Upon connection build game object
  		game.$loaded().then(function() {
  			game.data = {
          'state'  : 'waitingForPlayers',
  			}
  			return game.$save();
  		})
  		.then(function() {
        // after save is completed take us to Host view
  			$location.path('/host/' + PIN);
  		})
  	};

  });
