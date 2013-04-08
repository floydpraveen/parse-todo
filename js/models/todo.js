
define(
['jquery',
'underscore',
'backbone'
],

function(
$,
_,
Backbone
) {

var Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults :{
        id:null,
        title: null,
        done: null
    },

    initialize: function(){
      this.on('change', this.changeState, this);
    },

    url:"https://floydpraveen.firebaseio.com/todolist.json",  

    save: function(){
       var model = this;
       $.ajax({
          type: "PUT",
          url: "https://floydpraveen.firebaseio.com/todolist/"+model.get('id')+".json",
          data: JSON.stringify( model.toJSON()),
          success: function(e){
          }
        });
    },

     destroy: function(){
           var model = this;
           console.log("deleeing the model");
           console.log(model.toJSON());
           $.ajax({
              type: "DELETE",
              url: "https://floydpraveen.firebaseio.com/todolist/"+model.get('id')+".json",
              success: function(e){
                model.trigger('destroy');    
              }
            });
    },

    changeState:function(){
      this.save();
    }

  });

return Todo;

});