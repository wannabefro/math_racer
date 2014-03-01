Ember.Application.initializer({
  name: 'currentUser',
  initialize: function(container, application){
    var store = container.lookup('store:main');
    user = store.find('user').then(function(response){
      return response.get('lastObject');
    });
    user.then(function(user){
      controller = container.lookup('controller:currentUser').set('content', user);
      container.typeInjection('controller', 'currentUser', 'controller:currentUser');
    })
  }
})
