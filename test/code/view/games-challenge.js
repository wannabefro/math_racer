'use strict';

describe('GamesChallengeView', function() {
  var gamesChallengeView;

  beforeEach(function() {
    Ember.run(function() {
      App.reset();
      gamesChallengeView = App.GamesChallengeView.create();
      gamesChallengeView.append();
    });
  });

  it('', function() {

  });

  afterEach(function() {
    Ember.run(function() {
      gamesChallengeView.destroy();
    });
  });
});
