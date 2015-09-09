'use strict';

/**
 * @ngdoc function
 * @name kahootCloneApp.controller:HostCtrl
 * @description
 * # HostCtrl
 * Controller of the kahootCloneApp
 */
angular.module('kahootCloneApp')
  .controller('HostCtrl', function ($scope, Host, Trivia, $routeParams,$interval,fbutil) {

  	Host.init($routeParams.PIN)
  	.then(function() {
  		return Host.setupGame()
  	})
  	.then(function() {
  		Host.syncObject.$bindTo($scope, 'game');
  		$scope.$watch('game.data.state', function(newValue, oldValue) {

  			switch(newValue) {

  				case 'preQuestion':
  					$scope.countdown = 5;
  					$interval(function() {
  						$scope.countdown--;
  					},1000, $scope.countdown)
  					.then(function() {
  						Host.setGameState('question');
  					});
  					break;

				case 'question':
  					$scope.currentQuestion = Host.getCurrentQuestion();
  					$scope.answers = Trivia.getPossibleAnswers($scope.currentQuestion);
            $scope.game.data.possibleAnswers = $scope.answers;
					  $scope.countdown = 7;
  					$interval(function() {
  						$scope.countdown--;
  					},1000, $scope.countdown)
  					.then(function() {
  						Host.setGameState('postQuestion');
  					});
  					break;

				case 'postQuestion':
          $scope.correct = [];
					$scope.currentQuestion = Host.getCurrentQuestion();
          angular.forEach($scope.game.data.users, function(v,k) {
            
            if(Trivia.checkAnswer(Host.getCurrentQuestion().q, v.answer)) {
              v.currentPoints = (v.currentPoints || 0) + 100;
              $scope.correct.push(v.screen_name);
            }
          });
          Host.syncObject.$save();
					break;

        case 'leaderboard':
          $scope.leaderboard = _.map($scope.game.data.users, function(user) {
            return {
              screen_name:user.screen_name,
              current_points:user.currentPoints
            }
          })
  			}

  		})
  	});

  	$scope.startGame = function() {
  		$scope.game.data.state = 'preQuestion'
  	};

    $scope.nextQuestion = function() {
      // $scope.game.data.currentQuestion++;
      Host.nextQuestion();
    };

    $scope.endGame = function() {
      Host.setGameState('leaderboard');
    };

  });
