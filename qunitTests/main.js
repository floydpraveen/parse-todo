"use strict";
require.config({

    baseUrl: '../app',

    paths: {   
    jquery: "lib/jquery",
    underscore: "lib/underscore",
    backbone: "lib/backbone",
    text:"lib/text",
    helper:"utils/helper",
    
    QUnit: '../qunitTests/vendor/qunit',
    sinon:'../qunitTests/vendor/sinon',
    sinonQunit:'../qunitTests/vendor/sinonQunit',
    tests:'../qunitTests/'
    },

    

    shim: {
      underscore: {
        exports: "_"
      },

      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      },
      QUnit: {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       },

       sinon: {
          exports: 'sinon'
       },

       sinonQunit: {
        deps: ["sinon", "jquery"],
        exports: 'sinonQunit'
      }
    },
    waitSeconds: 5
});
// require the unit tests.
require(
    ['QUnit', 'tests/models/todo_test', 'tests/views/todoView_test'],
    function(QUnit, todoModel, todoView) {
        // run the tests.
        QUnit.load();
        QUnit.start();
        
        todoModel();
        todoView();
       
    }
);