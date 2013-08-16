define(
  ['js/models/todo', 'js/views/todoView', 'helper'],
  function(Todo, TodoView, helper) {

    var run = function() {

      module("TODO VIEW" , {

      setup: function() {
        this.server = sinon.fakeServer.create();
        this.server.respondWith("POST", helper.todosUrl, [
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

      test('edit on double clcik', function(){
         expect(1);
         var todo = new Todo({
          title: 'name'
        });
        this.view = new TodoView({
          model: todo
        });
        this.view.render();
        this.view.$el.find('.view').trigger('dblclick');
        ok(this.view.$el.hasClass('editing'), 'View shd have calss editing after double click');
      });

      test('toggle model value when user clciks toggle', function(){
          expect(1);
          var todo = new Todo();
          todo.set('done',false);
          var todoView = new TodoView({model:todo});
          todoView.render();
          todoView.$el.find('.toggle').trigger('click');
          equal(todoView.model.get('done'), true, 'model value should be toggled');
      });

      test('after edit save that to model', function(){
          expect(2);
         var todo = new Todo({
          title: 'name'
        });
         todo.url = helper.todosUrl;
        this.view = new TodoView({
          model: todo
        });
        this.view.render();
        this.view.$el.find('.view').trigger('dblclick');
        this.view.$el.find('input').val('testing');
        this.view.$el.find('.edit').trigger('blur');
        this.server.respond();
        equal(this.view.$el.hasClass('editing'),false, 'it should not contain editing class');
        equal(todo.get('title'),'testing','title should be the entered title in the edit field');
      });



    };
    return run
  }
);