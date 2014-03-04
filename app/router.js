'use strict';

App.Router.reopen({
  location: 'history'
});

App.Router.map(function() {
  this.resource('games', function(){
    this.route('challenge');
    this.route('practice');
    this.route('timed');
  });
});
