'use strict';

describe('GamesPracticeController', function() {
  var gamesSoloController;

  beforeEach(function() {
    Ember.run(function() {
      App.reset();
      gamesPracticeController = App.GamesPracticeController.create();
    });
  });

  it('', function() {

  });

  afterEach(function() {
    Ember.run(function() {
      gamesPracticeController.destroy();
    });
  });
});
