App.GamesRoute = Ember.Route.extend({
  actions: {
    makeQuestion: function(difficulty, parameters, controller){
      var question = '';
      var numbers = [];
      var operators = [];
      var combinations = parameters['combinations'];
      var min = parameters['min'];
      var max = parameters['max'];
      _(combinations + 1).times(function(n){
        numbers.push(_.random(min, max));
      });
      _(combinations).times(function(n){
        operators.push(' ' + _.sample(parameters['operators']) + ' ');
      });
      numbers = _.sortBy(numbers).reverse();
      question = _.zip(numbers, operators);
      question = question.join('').replace(/,/g, '');
      this.controllerFor(controller).set('currentQuestion', question);
    },
    answerQuestion: function(question, answer, controller){
      var correctAnswer = eval(question);
      var controller = this.controllerFor(controller);
      if (correctAnswer === Number(answer)){
        controller.set('correct', true);
      }
      controller.set('answer', null);
    },
  }
});
