'use strict';

/**
 * @ngdoc service
 * @name kahootCloneApp.Trivia
 * @description
 * # Trivia
 * Service in the kahootCloneApp.
 */
angular.module('kahootCloneApp')
  .service('Trivia', function (_) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var self = this;

    self.questions = [
    	{
    		'q':'What is the capital of Israel?',
    		'wrong_answers' : ['Tel-Aviv', 'Haifa', 'Eilat'],
    		'answer' : 'Jerusalem'
    	},
    	{
    		'q' : 'What is the definition of Pi?',
    		'wrong_answers' : ['Type of pastry', '3.14', 'Shorthand for pizza']
    		'answer' : 'Perimeter divided by diameter'
    	},
    	{
    		'q' : 'Who is the creator of TV show Breaking Bad?',
    		'wrong_answers' : 'Walter White', 'Saul Goodman', 'Vince Vega',
    		'answer' : 'Vince Galligan'
    	}
    ];

    self.getQuestions = function(){
    	return _.shuffle(self.questions)
    };


  });
