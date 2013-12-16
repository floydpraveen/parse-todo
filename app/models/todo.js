
//MODEL FOR ONE TODO ITEM, HOLDS ALL THE DATA REQUIRED FOR A TODO
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
        done: false
    },

    urlRoot:helper.todosUrl,

    initialize: function(options){
      $.extend(this,options)
     this.set('id',this.get('objectId'), {silent:true});
    },

    toggle:function() {
      var self = this;
      var prev_done = this.get("done");
      this.save({done: !this.get("done")},
        {
        success:function(){

        },
        error:function(){
            self.set('done',prev_done);
            self.trigger('error');
        }
      });
    },

    updateTitle:function(newTitle){
      var prevTitle = this.get('title'),
          self = this;
       this.save({'title': newTitle},
        {
        success:function(){
        },
        error:function(){
            self.set('title', prevTitle);
            self.trigger('error');
        }
      });
    },

    markComplete:function(value){
        var self = this;
        var prev_done = this.get("done");
        this.save({done: value},
            {
                error:function(){
                    self.set('done', prev_done);
                    self.trigger('error');
                }
            });
    },

    sync:function(method, model, option){
      var self = this;
      //ON SAVE, SEND A CALL BACK FUNC, WHICH WILL SET OBJECTID AS ID OF CREATED MODEL
      if(method=='create'){
        option.wait = true;
        option.success = function(resp, status, xhr){
           self.id = resp.objectId;
           model.trigger('create');
           delete self.objectId;
        };
        option.error = function(a, b){
           self.trigger('error');
           self.destroy();
        };
      }else if(method=='delete'){
        option.wait = true;
        option.success = function(resp, status, xhr){
           self.trigger('destroy', model);
        };
        option.error = function(a, b){
           self.trigger('error');
        };
      }

      Backbone.sync(method, model, option);
    }

  });

return Todo;

});