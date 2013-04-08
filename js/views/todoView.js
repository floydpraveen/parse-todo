define(
['jquery',
'underscore',
'backbone',
'text!templates/todo.html',
'helper'
],

function(
$,
_,
Backbone,
todoTemplate,
helper
) {

// The DOM element for a todo item...
  var TodoView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template(todoTemplate),

    // The DOM events specific to an item.
    events: {
      "click .toggle"   : "toggleDone",
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
     this.model.bind('change', this.render, this);
     this.model.bind('destroy', this.removeTodo, this);
    // this.model.bind('change', this.update, this);
     // this.listenTo(this.model, 'remove', this.remove);
    },

    // Re-render the titles of the todo item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));
      this.input = this.$('.edit');
     // console.log(this);
      return this;
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function() {
      this.model.set({done: !this.model.get("done")});
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      var value = this.input.val();
      if (!value) {
        this.clear();
      } else {
        this.model.set({title: value});
        this.update();
        this.$el.removeClass("editing");
      }
    },

    update:function(){
      this.model.save();
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove the item from the collection.
    clear: function() {
      helper.eventbus.trigger('deleteModel', this.model);
     // this.model.destroy();
      this.remove();
    },

    removeTodo:function(){
      console.log("removing todo from dom");
      this.remove();
    }

  });

return TodoView;

});