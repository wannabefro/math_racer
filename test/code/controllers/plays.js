'use strict';

describe('PlaysController', function() {
  var playsController;

  beforeEach(function() {
    Ember.run(function() {
      App.reset();
      playsController = App.PlaysController.create();
    });
  });

  it('', function() {

  });

  afterEach(function() {
    Ember.run(function() {
      playsController.destroy();
    });
  });
});
