
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
    }

  });

return Todo;

});