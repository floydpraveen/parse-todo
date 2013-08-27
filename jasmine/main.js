require.config({
  baseUrl: "../js",
  //urlArgs: 'cb=' + Math.random(),

  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    jasmine: '../jasmine/lib/jasmine',
    'jasmine-html': '../jasmine/lib/jasmine-html',
    spec: '../jasmine/spec/',
    text:"lib/text",
    helper:"utils/helper"
  },

  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  }
});


//window.store = "TestStore"; // override local storage store name - for testing

require(['underscore', 'jquery', 'jasmine-html'], 
function(_, $, jasmine){
  console.log("loading jasmine");
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];

  specs.push('spec/views/todoview_spec');


  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });

});