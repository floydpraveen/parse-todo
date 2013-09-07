require.config({
  baseUrl: "../app",

  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',

    jasmine: '../tests/lib/jasmine',
    'jasmine-html': '../tests/lib/jasmine-html',
    specs: '../tests/specs',
    text:"lib/text",
    helper:"utils/helper",
    sinon:'../tests/lib/sinon', // FOR MOCKING AJAX 
    phantomsjsReporter:'../tests/lib/jasmine.phantomjs-reporter'  //FOR PRINTING STACK TRACE ON COMMAND LINE
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
     phantomsjsReporter:{
      deps: ['jasmine'],
      exports:'phantomsjsReporter'
    }
  }
});


//window.store = "TestStore"; // override local storage store name - for testing

require([
'underscore',
'jquery',
'jasmine-html',
'phantomsjsReporter'],

function(
_,
$,
jasmine,
phantomsjsReporter
){
  // set up for app
  $.ajaxSetup({ beforeSend : function(xhr, settings){ 
    xhr.setRequestHeader('X-Parse-Application-Id', 'xuxbStWSQTPbJhDA1rRt3Us0v6q8060YGkaWATur');
    xhr.setRequestHeader('X-Parse-REST-API-Key', 'usZe6mcCugckQmjtWZpulgJ3CfHGluTk6mBZVs3B');
  }});

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter(),
      phantomsjsReporter = new jasmine.PhantomJSReporter();

   jasmineEnv.addReporter(htmlReporter);
   jasmineEnv.addReporter(phantomsjsReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];

  specs.push('specs/views/todoviewspec');
  specs.push('specs/models/modelspec');


  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });

});