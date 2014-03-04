'use strict';

App.GamesChallengeController = Ember.Controller.extend({
  currentQuestion: null,
  gameDifficulty: 1,
  timeLeft: 10,
  timePerQuestion: 10,
  score: 0,
  lastRaise: 0,
  streak: 0,
  wrongStreak: 0,
  pointValue: 1,
  correct: false,
  parameters: {operators: ['+'], min: 1, max: 10, combinations: 1},
  playing: false,
  difficultyGap: 3,

  question: function(){
    var parameters = this.get('parameters');
    var modifier = this.get('gameDifficulty') * 10;
    this.send('makeQuestion', modifier, parameters, 'gamesChallenge');
    return this.get('currentQuestion');
  }.property('playing', 'currentQuestion'),

  difficulty: function(){
    if (this.get('streak') - (this.get('lastRaise')) >= this.get('difficultyGap')){
      this.incrementProperty('gameDifficulty');
      this.send('raiseDifficulty');
      this.set('lastRaise', this.get('streak'));
      return this.get('gameDifficulty');
    } else if (this.get('streak') > 0){
      this.send('raiseDifficulty');
      return this.get('gameDifficulty');
    } else if (this.get('wrongStreak') >= 2){
      this.send('lowerDifficulty');
      this.set('wrongStreak', 0);
      this.set('lastRaise', 0);
      this.set('currentQuestion', null);
      return this.get('gameDifficulty');
    } else {
      return this.get('gameDifficulty');
    }
  }.property('wrongStreak', 'streak', 'score'),

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
      this.set('wrongStreak', 0);
      this.set('difficultyGap', 3);
      this.set('gameDifficulty', 1);
      this.set('timePerQuestion', 10);
      this.toggleProperty('playing');
      this.send('resetParameters');
      this.send('countDown');
    },
    countDown: function(){
      var _this = this;
      this.timer = setInterval(function(){
      _this.decrementProperty('timeLeft')
      }, 1000);
    },

    resetParameters: function(){
      this.set('parameters', {operators: ['+'], min: 1, max: 10, combinations: 1});
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
        this.set('wrongStreak', 0);
        this.toggleProperty('correct');
      } else {
        this.set('streak', 0);
        this.incrementProperty('wrongStreak');
      }
    }
  }
});
