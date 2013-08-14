
define(
    ['../../models/todo',  'sinonQunit','../../utils/helper'],
    function(Todo,  sinonQunit, helper) {
        
        var run = function() {

           module('About TODO Model', {

				setup: function() {
					this.requests = [];
					this.xhr = sinon.useFakeXMLHttpRequest();
					this.xhr.onCreate = $.proxy(function(xhr) {
						this.requests.push(xhr);
					}, this);
				},
				teardown: function() {
					this.xhr.restore();
				}

			});

           test('init of model shd set id using object id', function() {
			    expect(1);
			    var todo = new Todo({'objectId':100});
			    equal(todo.get('id'), 100, "ID shd be 100");
			});

           test('Fires a custom event when the state changes.', function() {
			    expect(1);
			    var spy = this.spy();
			    var todo = new Todo();
			    todo.bind('change', spy);
			    // How would you update a property on the todo here?
			    // Hint: http://documentcloud.github.com/backbone/#Model-set
			    todo.set({ text: "new text" });
			    ok(spy.calledOnce, "A change event callback was correctly triggered");
			});

            test('model should be able to save the state', function() {
			    expect(3);
			    var todo = new Todo();
			    todo.set('done',true);
			    todo.set('id',100);
			    todo.url = helper.todosUrl;
			    todo.save();
			    var request = this.requests[0];
			    equal(request.method, 'PUT', 'TestModel#save should send a PUT');
			    equal(request.url, helper.todosUrl, '... to /api/testmodel/ endpoint');
			    equal(JSON.parse(request.requestBody).done, true, '... with valid SMTP json');			    
			});

        };        
        return {run: run}
    }
);