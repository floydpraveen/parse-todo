
define(
['jquery',
'underscore',
'backbone',
'helper'
],

function(
$,
_,
Backbone,
helper
) {

var Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults :{
        id:null,
        title: null,
        done: null
    },

    initialize: function(){
      this.set('id',this.get('objectId'), {silent:true});
    },

    toggle:function() {
      this.save({done: !this.get("done")});
    },

    done:function(value){
        this.save({done: value});
    }

  });

return Todo;

});