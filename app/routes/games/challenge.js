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
        this.send('lowerTime');
        this.send('raiseValue');
      };
      switch(true){
        case (score > 25):
          if (parameters['combinations'] < 3){
            this.send('addCombination');
          }
          break;
        case (score > 15):
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
    raiseValue: function(){
      this.controller.incrementProperty('pointValue');
    },
    lowerTime: function(){
      var timePerQuestion = this.controller.get('timePerQuestion');
      this.controller.set('timePerQuestion', Math.round(timePerQuestion * 0.92));
    },
    addCombination: function(){
      var parameters = this.controller.get('parameters');
      parameters['combinations'] += 1;
    }
  }
});
