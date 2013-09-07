## parse - todo

A sample backbone app with some best practices 

###### Libraries used 
- Backbone.js (for MVC)
- Require.js  (for AMD)
- jasmine     (for unit testing)
- phantomjs_jasmine_runner ( to run jasmine tests via phantomjs [https://github.com/detro/phantomjs-jasminexml-example](phantomjs-jasminexml-example))

###### To run this app locally, follwo the commands below
 
 - download : `git clone https://github.com/floydpraveen/parse-todo.git`
 - cd : `cd parse-todo`
 + Start a server : `python -m SimpleHTTPServer 3000`
 * check the app in the url : `http://localhost:3000/`
 - To run test cases ( jasmine ): `http://localhost:3000/tests/`
 - To run test cases ( QUnit ): `http://localhost:3000/qunitTests/`

###### To run tests via cli run following commands

 - install phantomjs if you don't have: `npm install phantomjs -g`
 - install dependencies : `npm install` 
 + start grunt : `grunt`  (this will run jasmine specs)











