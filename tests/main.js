"use strict";
require.config({

    baseUrl: '../',
    paths: {
    QUnit: 'tests/vendor/qunit',
    sinon:'tests/vendor/sinon',
    sinonQunit:'tests/vendor/sinonQunit',
    jquery: "js/lib/jquery",
    underscore: "js/lib/underscore",
    backbone: "js/lib/backbone",
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
    ['QUnit', 'tests/models/todo_test'],
    function(QUnit, todoModel) {
        // run the tests.
        todoModel.run();
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);