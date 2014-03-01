'use strict';

App.Router.reopen({
  location: 'history'
});

App.Router.map(function() {
  this.resource('games', function(){
    this.route('solo');
  });
});
