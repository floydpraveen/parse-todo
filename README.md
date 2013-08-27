## parse - todo

A sample backbone app with some best practices 

###### Libraries used 
- Backbone.js (for MVC)
- Require.js  (for AMD)
- jasmine     (for unit testing)
- run-jasmine.js ( to run jasmine tests via phantomjs [https://github.com/ariya/phantomjs/blob/master/examples/run-jasmine.js](https://github.com/ariya/phantomjs/blob/master/examples/run-jasmine.js))

###### To run this app locally, follwo the commands below
 
 - download : `git clone https://github.com/floydpraveen/parse-todo.git`
 + Start a server : `python -m SimpleHTTPServer 3000`
 * check the app in the url : `http://localhost:3000/`
 - To run test cases ( jasmine ): `http://localhost:3000/jasmine/`
 - To run test cases ( QUnit ): `http://localhost:3000/tests/`

###### To run tests via grunt run following commands

 - install phantomjs if you don't have: 'npm install phantomjs -g'
 - install grunt CLI :'npm install -g grunt-cli'
 - install dependencies : `npm install` 
 + start grunt : `grunt`  (this will run jasmine test specs)











