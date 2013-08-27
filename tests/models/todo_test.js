
define(
    ['models/todo',  'sinonQunit','helper'],
    function(Todo,  sinonQunit, helper) {
        
        var run = function() {

		module('About TODO Model', {

			setup: function() {
				this.server = sinon.fakeServer.create();
				this.server.respondWith("PUT", helper.todosUrl, [
					200, {
						"Content-Type": "application/json"
					},
					'[{"id": 0, "done": "Hello World"}]'
				]);

			},
			teardown: function() {
				this.server.restore();
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

            test('model toggle its state on toggle called', function() {

			    expect(1);
			    var todo = new Todo();
			    todo.set('done',true);
			    todo.set('id',100);
			    todo.url = helper.todosUrl;
			    todo.toggle();
			    this.server.respond();
			    equal(todo.get('done'), false, 'with valid SMTP json');			    
			});

			 test('check the function done', function() {
			    expect(1);
			    var todo = new Todo();
			    todo.set('done',true);
			    todo.set('id',100);
			    todo.url = helper.todosUrl;
			    todo.done(false);
			    this.server.respond();
			    equal(todo.get('done'), false, 'with valid SMTP json');
			});

        };        
        return run;
    }
);