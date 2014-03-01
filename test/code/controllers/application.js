'use strict';

describe('ApplicationController', function() {
  var applicationController;

  beforeEach(function() {
    Ember.run(function() {
      App.reset();
      applicationController = App.ApplicationController.create();
    });
  });

  it('', function() {

  });

  afterEach(function() {
    Ember.run(function() {
      applicationController.destroy();
    });
  });
});
