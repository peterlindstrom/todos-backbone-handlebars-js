(function() {
  var Todos = {};
  window.Todos = Todos;

  var template = function(name) {
    return Handlebars.compile($('#'+name+'-template').html());
  };

  Todos.Todo = Backbone.Model.extend({
  });

  Todos.Todos = Backbone.Collection.extend({
    localStorage: new Store("todos")
  });

  Todos.Index = Backbone.View.extend({
    template: template('index'),
    initialize: function() {
      this.todos = new Todos.Todos();
      this.todos.on('all', this.render, this);
      this.todos.fetch();
    },
    render: function() {
      this.$el.html(this.template(this));
      this.todos.each(this.addTodo, this);
      var form = new Todos.Index.Form({collection: this.todos});
      this.$el.append(form.render().el);
      return this;
    },
    addTodo: function(todo) {
      var view = new Todos.Index.Todo({model: todo});
      this.$('.todos').append(view.render().el);
    },
    count: function() {
      return this.todos.length;
    }
  });

  Todos.Index.Todo = Backbone.View.extend({
    className: 'well',
    template: template('todo'),
    events: {
      'click button': 'delete'
    },
    render: function() {
      this.$el.html(this.template(this));
      return this;
    },
    name:        function() { return this.model.get('name');        },
    text: function() { return this.model.get('text'); },
    delete: function() {
      this.model.destroy();
    }
  });

  Todos.Index.Form = Backbone.View.extend({
    tagName: 'form',
    className: 'form-horizontal',
    template: template('form'),
    events: {
      'submit': 'add'
    },
    render: function() {
      this.$el.html(this.template(this));
      return this;
    },
    add: function(event) {
      event.preventDefault();
      this.collection.create({
        name: this.$('#name').val(),
        text: this.$('#text').val()
      });
      this.render();
    }
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
