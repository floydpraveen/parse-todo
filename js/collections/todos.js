
define(
['jquery',
'underscore',
'backbone',
'models/todo',
'helper'
],

function(
$,
_,
Backbone,
Todo,
helper
) {

 // The collection of todos is backed by *Firebase*.
  var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Todo,
     // Save all of the todo items in a Firebase.
    url:helper.todosUrl,

    initialize: function(options){
      var self = this;
      this.fetch({
        success: function(response) {
            var obj = self.toJSON();
            self.reset();
            self.add(obj[0].results, {silent:true});
            self.bind('add', self.saveModel, self);
            options.onComplete();
        }
      });
     // this.bind('add', this.save, this);
        
        //this.bind('change', this.toggle, this);
    },

    saveModel: function(model){
      console.log("inside save model");
       model.save({},{
        success:function(r){
          console.log("saved model");
          console.log(r);
          model.set('id',model.get('objectId'));
        }
       });
    },

    toggle:function(model){
       model.save();
    },

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(todo){ return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    removeFromList:function(model){
      console.log("remove this");
      console.log(model.toJSON());
    }

  });

return TodoList;

});