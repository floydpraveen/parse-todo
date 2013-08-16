
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
      var self = this;
      var prev_done = this.get("done");
      this.save({done: !this.get("done")},
        {success:function(){

        },
        error:function(){
            self.set('done',prev_done);
        }
    });
    },

    done:function(value){
        var self = this;
        this.save({done: value},
            {
                error:function(){
                    self.set('done',!value);
                }
            });
    }

  });

return Todo;

});