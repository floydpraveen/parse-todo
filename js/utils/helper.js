define(
[
'underscore',
'backbone'
],

function(
_,
Backbone
) {

var helper={
	eventbus:_.extend({}, Backbone.Events)
 };

return helper;

});