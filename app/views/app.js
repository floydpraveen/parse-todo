define(
['jquery',
'underscore',
'backbone',
'text!templates/clearCompleted.html',
'models/todo',
'collections/todos',
'views/todoView',
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
      
      //COLLECTION FOR THIS TODOS
      this.todos = new TodoList();
      this.input = this.$("#new-todo");
      this.allCheckbox = this.$("#toggle-all")[0];  
      //ON ADDING MODELS TO COLLECTION AT ONCE, RENDER THEM AL TO DOM   
      this.todos.bind('reset', this.addAll, this); 
      //ON ADDING EACH MODEL TO COLLECTION, RENDER IT
      this.todos.bind('add', this.addOne, this);
      //ON REMOVING MODEL FROM COLLECTION, UPDATE THE STATS ABOUT TODOS
      this.todos.bind('remove', this.render, this);  
      //ON CHANGE OF MODEL UNDER COLLECTION, UPDATE THE STATS OF TODOS
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
        this.main.show();
        this.footer.show();
        this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
      } else {
        this.main.hide();
        this.footer.hide();
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
      //ADD TODO ITEM TO COLLECTION
      this.todos.create(new Todo({title: this.input.val(), done:false }));
      this.input.val('');
    },

    // Clear all done todo items.
    clearCompleted: function() {
      this.todos.clearCompleted();
    },

    deleteTodo:function(model){
      this.todos.remove(model);
      model.destroy();
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      this.todos.each(function (todo) { 
        todo.markComplete(done); 
      });
    }

  });
return AppView;
});