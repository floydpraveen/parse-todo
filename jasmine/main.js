require.config({
  baseUrl: "../app",
  //urlArgs: 'cb=' + Math.random(),

  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    jasmine: '../jasmine/lib/jasmine',
    'jasmine-html': '../jasmine/lib/jasmine-html',
    spec: '../jasmine/spec/',
    text:"lib/text",
    helper:"utils/helper",
    sinon:'../jasmine/lib/sinon', // FOR MOCKING AJAX 
    consoleRunner:'../jasmine/lib/console-runner' //FOR PRINTING STACK TRACE ON COMMAND LINE
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
    },
    sinon: {
        exports: 'sinon'
    },
    consoleRunner:{
      deps: ['jasmine'],
      exports:'consoleRunner'
    }
  }
});


//window.store = "TestStore"; // override local storage store name - for testing

require(['underscore', 'jquery', 'jasmine-html', 'consoleRunner'], 
function(_, $, jasmine, consoleRunner){
  console.log("loading jasmine");
  // set up for app
  $.ajaxSetup({ beforeSend : function(xhr, settings){ 
    xhr.setRequestHeader('X-Parse-Application-Id', 'xuxbStWSQTPbJhDA1rRt3Us0v6q8060YGkaWATur');
    xhr.setRequestHeader('X-Parse-REST-API-Key', 'usZe6mcCugckQmjtWZpulgJ3CfHGluTk6mBZVs3B');
  }});

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter(),
      consoleReporter = new jasmine.ConsoleReporter();

   jasmineEnv.addReporter(htmlReporter);
   jasmineEnv.addReporter(consoleReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];

  specs.push('spec/views/todoviewspec');
  specs.push('spec/models/modelspec');


  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });

});