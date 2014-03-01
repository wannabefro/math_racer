App.IndexRoute = Ember.Route.extend({
  actions: {
    newUser: function(name){
      user = this.store.createRecord('user', {name: name});
      user.save();
      this.controllerFor('currentUser').set('content', user);
    }
  }
});
