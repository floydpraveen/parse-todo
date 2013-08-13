"use strict";
require.config({


    paths: {
    QUnit: 'vendor/qunit',
    sinon:'vendor/sinon',
    sinonQunit:'vendor/sinonQunit',
    jquery: "../lib/jquery",
    underscore: "../lib/underscore",
    backbone: "../lib/backbone",
    text:"../lib/text",
    helper:"../utils/helper"
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
    }
});
// require the unit tests.
require(
    ['QUnit', 'models/todo_test'],
    function(QUnit, todoModel) {
        // run the tests.
        todoModel.run();
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);