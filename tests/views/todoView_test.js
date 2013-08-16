define(
  ['js/models/todo', 'js/views/todoView', 'sinonQunit', 'helper'],
  function(Todo, TodoView, sinonQunit, helper) {

    var run = function() {

      module("TODO VIEW", {
        setup: function() {},
        teardown: function() {}
      });

      asyncTest('render on model change', function() {
        expect(2);
        var todo = new Todo({
          title: 'name'
        });
        this.view = new TodoView({
          model: todo
        });
        todo.trigger('change');
        //console.log(this.view.$el.html().length);
        ///console.log(this.view.$el.find('div').length);
        equal(this.view.$el.find('div').length, 1, 'view should render it self');
        ok(this.view.$el.html().length > 0, 'html should be rendered');
        start();
      });



    };
    return run
  }
);