'use strict';

describe('GamesTimedView', function() {
  var gamesTimedView;

  beforeEach(function() {
    Ember.run(function() {
      App.reset();
      gamesTimedView = App.GamesTimedView.create();
      gamesTimedView.append();
    });
  });

  it('', function() {

  });

  afterEach(function() {
    Ember.run(function() {
      gamesTimedView.destroy();
    });
  });
});
