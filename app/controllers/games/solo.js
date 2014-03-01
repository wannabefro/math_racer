'use strict';

App.GamesSoloController = Ember.Controller.extend({
  currentQuestion: null,
  streak: 0,
  attempts: 0,
  questionParameters: {
    'easy':{operators: ['+', '-'], min: 1, max: 10, combinations: 1},
    'medium': {operators: ['+', '-', '*'], min: 1, max: 10, combinations: 1},
    'hard': {operators: ['+', '-', '/', '*'], min: 1, max: 20, combinations: 2}
  },
  playing: false,
  difficulty: 'easy',
  difficulties: ["easy", "medium", "hard"],

  question: function(){
    this.send('makeQuestion');
    return this.get('currentQuestion');
  }.property('difficulty', 'playing', 'currentQuestion'),

  actions: {
    start: function(){
      this.toggleProperty('playing')
    },
    makeQuestion: function(){
      var difficulty = this.get('difficulty');
      var parameters = this.get('questionParameters')[difficulty];
      var question = '';
      var numbers = [];
      var operators = [];
      var combinations = parameters['combinations'];
      var min = parameters['min'];
      var max = parameters['max'];
      _(combinations + 1).times(function(n){
        numbers.push(_.random(min, max));
      });
      _(combinations).times(function(n){
        operators.push(' ' + _.sample(parameters['operators']) + ' ');
      });
      numbers = _.sortBy(numbers).reverse();
      question = _.zip(numbers, operators);
      question = question.join('').replace(/,/g, '');
      this.set('currentQuestion', question);
    },
    answerQuestion: function(answer){
      var correctAnswer = eval(this.get('currentQuestion'));
      if (correctAnswer === Number(answer)){
        this.set('currentQuestion', null);
        this.set('attempts', 0);
        this.incrementProperty('streak');
      } else {
        this.incrementProperty('attempts');
        this.set('streak', 0);
      }
      this.set('answer', null);
    },
    restart: function(){
      this.toggleProperty('playing');
    }
  }
});
