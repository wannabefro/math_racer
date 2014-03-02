'use strict';

App.GamesPracticeController = Ember.Controller.extend({
  currentQuestion: null,
  streak: 0,
  attempts: 0,
  questionParameters: {
    'easy':{operators: ['+', '-'], min: 1, max: 10, combinations: 1},
    'medium': {operators: ['+', '-', '*'], min: 4, max: 11, combinations: 1},
    'hard': {operators: ['+', '-', '/', '*'], min: 1, max: 20, combinations: 2}
  },
  playing: false,
  difficulty: 'easy',
  difficulties: ["easy", "medium", "hard"],

  question: function(){
    var difficulty = this.get('difficulty');
    var parameters = this.get('questionParameters')[difficulty];
    this.send('makeQuestion', difficulty, parameters, 'gamesPractice');
    return this.get('currentQuestion');
  }.property('difficulty', 'playing', 'currentQuestion'),

  actions: {
    start: function(){
      this.toggleProperty('playing')
    },
    restart: function(){
      this.toggleProperty('playing');
    },
    answer: function(answer){
      var question = this.get('currentQuestion');
      this.send('answerQuestion', question, answer, 'gamesPractice');
    }
  }
});
