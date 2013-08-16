
define(
['jquery',
'underscore',
'backbone',
'js/models/todo',
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
      this.bind('add', this.saveModel, this); 
    },

    saveModel: function(model){
       model.save({},{
        success:function(r){
          model.set('id',model.get('objectId'));
        }
       });
    },

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(todo){ return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    parse:function(data){
      return data.results;       
    }

  });

return TodoList;

});