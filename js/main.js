require.config({

  baseUrl: '../',
  paths: {
    // Libraries
    jquery: "js/lib/jquery",
    underscore: "js/lib/underscore",
    backbone: "js/lib/backbone",
  //  firebase:'lib/firebase',
    text:"js/lib/text",
    helper:"js/utils/helper"
  },
  
  shim: {
    underscore: {
      exports: "_"
    },

    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },

    

  },
  
  waitSeconds: 5

});

require([
    'jquery',
    'underscore',
    'backbone',
    'js/views/app'
],

function($, _, Backbone, App ) {

   $.ajaxSetup({ beforeSend : function(xhr, settings){ 
    xhr.setRequestHeader('X-Parse-Application-Id', 'xuxbStWSQTPbJhDA1rRt3Us0v6q8060YGkaWATur');
    xhr.setRequestHeader('X-Parse-REST-API-Key', 'usZe6mcCugckQmjtWZpulgJ3CfHGluTk6mBZVs3B');
  }});

  var app = new App();  
  
  console.log("require.js initializing the app ");
  
});

