
define(
    ['../../models/todo','sinonQunit'],
    function(Todo, sinonQunit) {
        
        var run = function() {

        	module('About TODO Model');
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

        };        
        return {run: run}
    }
);