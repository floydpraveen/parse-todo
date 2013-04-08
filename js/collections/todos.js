
define(
['jquery',
'underscore',
'backbone',
'models/todo'
],

function(
$,
_,
Backbone,
Todo
) {

 // The collection of todos is backed by *Firebase*.
  var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Todo,
     // Save all of the todo items in a Firebase.
    url:"https://floydpraveen.firebaseio.com/todolist.json",

    initialize: function(){
        this.bind('add', this.save, this);
        
        //this.bind('change', this.toggle, this);
    },

    save: function(model){
       console.log("saving the todo");
       this.model.bind('destroy', this.removeFromList, this);
       $.ajax({
          type: "POST",
          url: "https://floydpraveen.firebaseio.com/todolist.json",
          data: JSON.stringify( model.toJSON()),
          success: function(e){
              console.log("saved todo");
              console.log(e);
              model.set({'id':e}, {silent:true});
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