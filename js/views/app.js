define(
['jquery',
'underscore',
'backbone',
'text!js/templates/clearCompleted.html',
'js/models/todo',
'js/collections/todos',
'js/views/todoView',
'helper'
],

function(
$,
_,
Backbone,
template,
Todo,
TodoList,
TodoView,
helper
) {

// Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template(template),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-todo":  "createOnEnter",
      "click #clear-completed": "clearCompleted",
      "click #toggle-all": "toggleAllComplete"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *Firebase*.
    initialize: function() {
      helper.eventbus.on('deleteModel', this.deleteTodo, this);
      this.todos = new TodoList();
      this.input = this.$("#new-todo");
      this.allCheckbox = this.$("#toggle-all")[0];     
      this.todos.bind('reset', this.addAll, this); 
      this.todos.bind('add', this.addOne, this);
      this.todos.bind('remove', this.render, this);  
      this.todos.bind('change', this.render, this);

      this.footer = this.$('footer');
      this.main = $('#main');
      this.todos.fetch();

    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
     var done = this.todos.done().length;
     var remaining = this.todos.remaining().length;

      if (this.todos.length) {
        this.main.show('slow');
        this.footer.show('slow');
        this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
      } else {
        this.main.hide('slow');
        this.footer.hide('slow');
      }

      this.allCheckbox.checked = !remaining;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new TodoView({model: todo});
      this.$("#todo-list").append(view.render().el);
      this.render();
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      this.todos.each(function(todo) {
         var view = new TodoView({model: todo});
        this.$("#todo-list").append(view.render().el);
      });
      this.render();

    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *Firebase*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;

      this.todos.add(new Todo({title: this.input.val(), done:false }));
      this.input.val('');
    },

    // Clear all done todo items.
    clearCompleted: function() {
      var self = this;
      this.todos.done().forEach(function(model) {
         model.destroy();
        self.todos.remove(model);
      });
      return false;
    },

    deleteTodo:function(model){
      this.todos.remove(model);
      model.destroy();
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      this.todos.each(function (todo) { 
        todo.done(done); 
      });
    }

  });
return AppView;
});