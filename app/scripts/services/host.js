'use strict';

/**
 * @ngdoc service
 * @name kahootCloneApp.Host
 * @description
 * # Host
 * Service in the kahootCloneApp.
 */
angular.module('kahootCloneApp')
  .service('Host', function (fbutil, Trivia) {
    var self = this, _so;

    self.init = function(PIN) {
    	self.syncObject = fbutil.syncObject('games/' + PIN);
    	_so = self.syncObject;
    	return self.syncObject.$loaded();
    };

    self.setupGame = function() {
    	if(! _so.data.hasOwnProperty('questions')) {
    		_so.data.questions = Trivia.getQuestions();
    		_so.data.currentQuestion = 0;
    	}
    	return _so.$save();
    };

    self.getCurrentQuestion = function() {
        return _so.data.questions[_so.data.currentQuestion];
    };

    self.setGameState = function(state) {
        _so.data.state = state;
        return _so.$save();
    };

    self.nextQuestion = function() {
        _so.data.state = 'preQuestion';
        _so.data.currentQuestion++;
        return _so.$save();
    }

  });
