'use strict';

App.GamesPracticeController = Ember.Controller.extend({
  currentQuestion: null,
  correct: false,
  streak: 0,
  attempts: 0,
  questionParameters: {
    'easy':{operators: ['+', '-'], min: 1, max: 10, combinations: 1},
    'medium': {operators: ['+', '-', '*'], min: 4, max: 11, combinations: 1},
    'hard': {operators: ['+', '-', '*'], min: 1, max: 20, combinations: 2}
  },
  playing: false,
  difficulty: 'easy',
  difficulties: ["easy", "medium", "hard"],

  modifier: function(){
    switch(this.get('difficulty')){
      case 'easy':
        20;
        break;
      case 'medium':
        40
        break;
      case 'hard':
        80
        break;
    }
  }.property('difficulty'),

  question: function(){
    var difficulty = this.get('difficulty');
    var parameters = this.get('questionParameters')[difficulty];
    var modifier = this.get('modifier');
    this.send('makeQuestion', modifier, parameters, 'gamesPractice');
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
      if (this.get('correct')){
        this.set('currentQuestion', null);
        this.set('attempts', 0);
        this.incrementProperty('streak');
        this.toggleProperty('correct');
      } else {
        this.incrementProperty('attempts');
        this.set('streak', 0);
      }
    }
  }
});
