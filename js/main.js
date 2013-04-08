require.config({

  paths: {
    // Libraries
    jquery: "lib/jquery",
    underscore: "lib/underscore",
    firebase:"lib/firebase",
    backbone: "lib/backbone",
    text:"lib/text",
    helper:"utils/helper"
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
  
  waitSeconds: 15

});

require([
    'jquery',
    'underscore',
    'backbone',
    'views/app'
],

function($, _, Backbone, App) {

  var app = new App();  
  console.log("require.js initializing the app ");
  
});

