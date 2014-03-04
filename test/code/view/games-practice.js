'use strict';

describe('GamesPracticeView', function() {
  var gamesPracticeView;

  beforeEach(function() {
    Ember.run(function() {
      App.reset();
      gamesPracticeView = App.GamesPracticeView.create();
      gamesPracticeView.append();
    });
  });

  it('', function() {

  });

  afterEach(function() {
    Ember.run(function() {
      gamesPracticeView.destroy();
    });
  });
});
