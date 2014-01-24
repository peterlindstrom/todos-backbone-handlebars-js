(function() {
  var Todos = {};
  window.Todos = Todos;

  var template = function(name) {
    return Handlebars.compile($('#'+name+'-template').html());
  };

  // Create an empty backbone model Todo and put it in the namespace Todos
  // Todos.Todo = Backbone.Model.extend({
  //});
 
  Todos.Todo = Backbone.Model.extend({
  });

  // Create a backbone collection Todos
  // Todos.Todos = ...
  //   * also create a localstorage in the collection Todos (localStorage: new Store("todos"))
  Todos.Todos = Backbone.Collection.extend({
  });

  // Create a backbone View named Index in the namespace Todos
  // Todo.Index = ...
  // Set the template to template('index')
  // In the initialize method create a new Todos collection and set it to this.todos
  // Call fetch on the collection
  // in the render method set the this.$el to the rendered template, by calling this template
  //    for every todo in todos collection, call the addTodo method ( we have not created the addTodo yet)
  //    create a new Todos.Index.Form view and set the colletion to this.todos
  //    render the form view and append it to this.$el
  // Create a addTodo method, create a new Todos.Index.Todo view and render with todo model as parameter model
  // Implement a count method returning this.todos.length
  Todos.Index = Backbone.View.extend({
    /*"template: ...",
    initialize: function() {
      
    },
    render: function() {
      
    },
    addTodo: function(todo) {
     
    },
    count: function() {
    }*/
  });

  // Create a new view named Todos.Index.Todo
  // use the todo template
  // catch "click button" events calling the delete method
  // render shall set the rendered template to $el
  // create a method named 'name' and let it return 'name' from the model
  // create a method named 'text' and let it return 'text' from the model
  // create a method named 'delete' and let it destroy the model
  
  Todos.Index.Todo = Backbone.View.extend({
    /*className: 'well',
    template: template('todo'),
    events: {
    },
    render: function() {
    },
    name:        function() {},
    text: function() { },
    delete: function() {
    }*/
  });


  // Create a new view named Todos.Index.Form
  // Set the tagName to 'form' so it will create a form container
  // Set the template to form
  // Listen to submit events and call add
  // The render method should render the template to $el
  // The add method should create a todo object in this views collection with with: 
  // {
  //    name: this.$('#name').val(),
  //    text: this.$('#text').val()
  // }
  // after adding the model to this views collection it should render the view
  Todos.Index.Form = Backbone.View.extend({
    /*tagName: 'form',
    className: 'form-horizontal',
    template: ...,
    events: {
    },
    render: function() {
    },
    add: function(event) {
    }*/
  });

  Todos.Router = Backbone.Router.extend({
    initialize: function(options) {
      this.el = options.el
    },
    routes: {
      "": "index"
    },
    index: function() {
      var index = new Todos.Index();
      this.el.empty();
      this.el.append(index.render().el);
    }
  });

  Todos.init = function(container) {
    container = $(container);
    var router = new Todos.Router({el: container})
    Backbone.history.start();
  }
})()
