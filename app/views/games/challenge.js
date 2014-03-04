'use strict';

App.GamesChallengeView = Ember.View.extend({
  keyPress: function(event){
    var controller = this.get('controller');
    var playing = controller.playing;
    if (event.keyCode === 13 && playing){
      var answer = controller.answer;
      controller.send('answer', answer);
    }
  }
});
