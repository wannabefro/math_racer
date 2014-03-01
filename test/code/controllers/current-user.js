'use strict';

describe('CurrentUserController', function() {
  var currentUserController;

  beforeEach(function() {
    Ember.run(function() {
      App.reset();
      currentUserController = App.CurrentUserController.create();
    });
  });

  it('', function() {

  });

  afterEach(function() {
    Ember.run(function() {
      currentUserController.destroy();
    });
  });
});
