define(
    ['models/todo', 'views/todoView', 'helper'],
    function(Todo, TodoView, helper) {

        var run = function() {

            module("TODO VIEW", {
                setup: function() {
                  $('<ul></ul>',{
                    id:'todoList'
                  }).appendTo('body');

                  this.todoView = new TodoView({
                      model: new Todo()
                  });

                this.server = sinon.fakeServer.create();
                this.server.respondWith("POST", helper.todosUrl, [
                  200, {
                    "Content-Type": "application/json"
                  },
                  '[{"id": 0, "done": "Hello World"}]'
                ]);
                },
                teardown: function() {
                    this.todoView.remove();
                    $("#todoList").remove();
                     this.server.restore();
                }
            });

            asyncTest('render on model change', function() {
                expect(2);    
                this.todoView.model.set('title','title1');
                console.log(this.todoView.$el.is('div'));
                equal(this.todoView.$el.find('div').length, 1, 'view should render it self');
                ok(this.todoView.$el.html().length > 0, 'html should be rendered');
                start();
            });

            test('edit on double clcik', function() {
                expect(1);
                this.todoView.render();
                this.todoView.$el.find('.view').trigger('dblclick');
                ok(this.todoView.$el.hasClass('editing'), 'View shd have calss editing after double click');
            });

            //THIS TEST CASE FAILS IN CHROME !
            test('toggle model value when user clciks toggle', function(){                
                expect(1);
                this.todoView.model.set({'done':false, 'title': 'name'});
                this.todoView.render();
                this.todoView.$el.find('.toggle').trigger('click');
                equal(this.todoView.model.get('done'), true, 'model value should be toggled');
            });

            test('after edit save that to model', function() {
                expect(2);
                this.todoView.model.url = helper.todosUrl;
                this.todoView.render();
                this.todoView.$el.find('.view').trigger('dblclick');
                this.todoView.$el.find('input').val('testing');
                this.todoView.$el.find('.edit').trigger('blur');
                this.server.respond();
                equal(this.todoView.$el.hasClass('editing'), false, 'it should not contain editing class');
                equal(this.todoView.model.get('title'), 'testing', 'title should be the entered title in the edit field');
            });



        };
        return run
    }
);