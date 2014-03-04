App.GamesChallengeRoute = Ember.Route.extend({
  actions: {
    raiseDifficulty: function(){
      var controller = this.controller;
      var parameters = controller.get('parameters');
      var streak = controller.get('streak');
      var score = controller.get('score');
      if (streak % 3 === 0){
        this.controller.incrementProperty('difficultyGap');
        parameters['max'] += 2;
      };
      if (streak % 5 === 0){
        this.send('changeTime', 0.92);
        this.send('raiseValue');
      };
      switch(true){
        case (score > 25 && streak > 2):
          if (parameters['combinations'] < 3){
            this.send('addCombination');
          }
          break;
        case (score > 15 && streak > 2):
          if (parameters['combinations'] < 2){
            this.send('addCombination');
          }
          if (!(_.contains(parameters['operators'], '/'))){
            parameters['operators'].push('/');
          }
          break;
        case (score > 10):
          if (!(_.contains(parameters['operators'], '*'))){
            parameters['operators'].push('*');
          }
        break;
        case (score > 5):
        if (!(_.contains(parameters['operators'], '-'))){
          parameters['operators'].push('-');
        }
        break;
      }
    },
    lowerDifficulty: function(){
      var difficulty = this.controller.get('gameDifficulty');
      if (difficulty > 1){
        this.controller.decrementProperty('gameDifficulty');
      }
      var pointValue = this.controller.get('pointValue');
      if (pointValue > 1){
        this.controller.decrementProperty('pointValue');
      }
      var parameters = this.controller.get('parameters');
      if (parameters['max'] >= 8){
        parameters['max'] -= 2;
      }
    },
    raiseValue: function(){
      this.controller.incrementProperty('pointValue');
    },
    changeTime: function(modifier){
      var timePerQuestion = this.controller.get('timePerQuestion');
      this.controller.set('timePerQuestion', Math.round(timePerQuestion * modifier));
    },
    addCombination: function(){
      var parameters = this.controller.get('parameters');
      parameters['combinations'] += 1;
    }
  }
});
