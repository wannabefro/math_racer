'use strict';

App.GamesTimedController = Ember.Controller.extend({
  currentQuestion: null,
  timeLeft: 60,
  score: 0,
  correct: false,
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
    this.send('makeQuestion', difficulty, parameters, 'gamesTimed');
    return this.get('currentQuestion');
  }.property('difficulty', 'playing', 'currentQuestion'),

  actions: {
    start: function(){
      this.toggleProperty('playing')
      this.send('countDown');
    },
    countDown: function(){
      var _this = this;
      this.timer = setInterval(function(){
      _this.decrementProperty('timeLeft')
      }, 1000);
    },
    restart: function(){
      this.toggleProperty('playing');
    },
    answer: function(answer){
      var question = this.get('currentQuestion');
      this.send('answerQuestion', question, answer, 'gamesTimed');
      if (this.get('correct')){
        this.set('currentQuestion', null);
        this.incrementProperty('score');
        this.toggleProperty('correct');
      }
    }
  }
});
