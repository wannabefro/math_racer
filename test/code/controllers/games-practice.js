'use strict';

describe('GamesSoloController', function() {
  var gamesSoloController;

  beforeEach(function() {
    Ember.run(function() {
      App.reset();
      gamesSoloController = App.GamesSoloController.create();
    });
  });

  it('', function() {

  });

  afterEach(function() {
    Ember.run(function() {
      gamesSoloController.destroy();
    });
  });
});
