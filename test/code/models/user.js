'use strict';

describe('User', function() {
  var user;

  beforeEach(function() {
    Ember.run(function() {
      App.reset();
      user = App.User.create();
    });
  });

  it('', function() {

  });

  afterEach(function() {
    Ember.run(function() {
      user.destroy();
    });
  });
});
