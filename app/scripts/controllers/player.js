'use strict';

/**
 * @ngdoc function
 * @name kahootCloneApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the kahootCloneApp
 */
angular.module('kahootCloneApp')
  .controller('PlayerCtrl', function ($scope, Player, Trivia,$location,$routeParams) {
  	if(! $routeParams.hasOwnProperty('PIN')) {
  		$scope.game = {
  			data : {
  				state: 'joinGame'
  			}
  			
  		}
  	} else {
  		Player.init($routeParams.PIN)
      .then(function() {

        // $scope.clearAnswer();

      })
  		.then(function() {

  			Player.syncObject.$bindTo($scope,'game')
        .then(function() {

          $scope.currentQuestion = $scope.game.data.questions[$scope.game.data.currentQuestion];

          $scope.$watch('game.data.currentQuestion' , function(newValue, oldValue) {
            // $scope.clearAnswer();
            $scope.currentQuestion = $scope.game.data.questions[$scope.game.data.currentQuestion];
          });

        });

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
    $scope.clearAnswer = function() {
      Player.saveSelfAttr('answer', null);
    }
    $scope.saveAnswer = function(answer) {
      Player.saveSelfAttr('answer', answer);
    };

  });
