define(['models/todo', 'views/todoView', 'sinon'],
  function(Todo, View, sinon) {

    describe('View ::TODO', function() {

      var mockData = {
          title: 'Foo Bar',
          done: false
      };

      beforeEach(function() {
        this.todo = new Todo(mockData);
        this.view = new View({
          model: this.todo
        });
        $('#sandbox').html(this.view.render().el);
      });

      afterEach(function() {
        this.view.remove();
      });

      describe('Render the model to the dom', function() {

        it("should represent model data in the html dom", function() {
          expect(this.view.$('label').text()).toEqual(this.todo.get('title'));
          expect(this.view.$('input.toggle').is(':checked')).toEqual(this.todo.get('done'));
          this.todo.set('done', !this.todo.get('done'));
          expect(this.view.$('input.toggle').is(':checked')).toEqual(this.todo.get('done'));
        });

        it("should toggle model when clciking checkbox", function() {
          spyOn(this.todo, 'toggle');
          this.view.$el.find('.toggle').trigger('click');
          expect(this.todo.toggle).toHaveBeenCalled();
        });

        it("on double click go to edit mode", function() {
          this.view.$el.find('.view').trigger({type: 'dblclick'});
          expect(this.view.$el.hasClass('editing')).toEqual(true);
        });
  

      });


    });


  });