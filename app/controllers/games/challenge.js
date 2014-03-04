'use strict';

App.GamesChallengeController = Ember.Controller.extend({
  currentQuestion: null,
  gameDifficulty: 1,
  timeLeft: 10,
  timePerQuestion: 10,
  score: 0,
  lastRaise: 0,
  streak: 0,
  pointValue: 1,
  correct: false,
  originalParameters: {operators: ['+'], min: 1, max: 10, combinations: 1},
  parameters: {operators: ['+'], min: 1, max: 10, combinations: 1},
  playing: false,
  difficultyGap: 1,

  question: function(){
    var parameters = this.get('parameters');
    var modifier = this.get('difficultyGap') * 10;
    this.send('makeQuestion', modifier, parameters, 'gamesChallenge');
    return this.get('currentQuestion');
  }.property('playing', 'currentQuestion'),

  difficulty: function(){
    if (this.get('streak') - (this.get('lastRaise')) >= this.get('difficultyGap')){
      var parameters = this.get('parameters');
      this.send('raiseDifficulty');
      this.incrementProperty('gameDifficulty');
      this.set('lastRaise', this.get('streak'));
      return this.get('gameDifficulty');
    } else {
      return this.get('gameDifficulty');
    }
  }.property('streak', 'score'),

  gameOver: function(){
    if (this.get('timeLeft') <= 0){
      clearInterval(this.timer);
      this.toggleProperty('playing');
      return true;
    }
  }.property('timeLeft'),

  actions: {
    start: function(){
      this.set('score', 0);
      this.set('timeLeft', 10);
      this.set('streak', 0);
      this.set('pointValue', 1);
      this.set('lastRaise', 0);
      this.set('gameDifficulty', 1);
      this.set('timePerQuestion', 10);
      this.set('parameters', this.get('originalParameters'));
      this.toggleProperty('playing');
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
      clearInterval(this.timer);
    },
    answer: function(answer){
      var question = this.get('currentQuestion');
      this.send('answerQuestion', question, answer, 'gamesChallenge');
      if (this.get('correct')){
        this.set('currentQuestion', null);
        this.incrementProperty('streak');
        this.set('timeLeft', this.get('timePerQuestion'));
        this.set('score', this.get('score') + this.get('pointValue'));
        this.toggleProperty('correct');
      } else {
        this.set('streak', 0);
      }
    }
  }
});
