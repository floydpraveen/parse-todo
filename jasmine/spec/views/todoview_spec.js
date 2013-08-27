describe('View :: View Task View', function() {

  var mockData = { title: 'Foo Bar',
                   done: true };

  beforeEach(function() {
    var flag = false,
        that = this;

    require(['models/todo', 'views/todoView'], 
    function(Todo, View) {
      that.todo = new Todo(mockData);
      that.todo.sync = function(){};
      that.view = new View({model: that.todo});
      $('#sandbox').html(that.view.render().el);
      flag = true;
    });

    waitsFor(function() {
      return flag;
    });

  });

  afterEach(function() {
    this.view.remove();
  });

  describe('Render', function() {

    it("should represent model data", function(){
      expect(this.view.$('label').text() ).toEqual(this.todo.get('title'));
      expect(this.view.$('input.toggle').is(':checked')).toEqual(this.todo.get('done'));
      this.todo.set('done', !this.todo.get('done'));
      expect(this.view.$('input.toggle').is(':checked')).toEqual(this.todo.get('done'));
    });

  });

  // describe('Handle Events', function() {
    
  //   it("should handel mouseover", function(){
  //     this.view.$el.trigger({type: 'mouseover'});
  //     expect(this.view.$el.hasClass('over')).toEqual(true);
  //     this.view.$el.trigger({type: 'mouseout'});
  //     expect(this.view.$el.hasClass('over')).toEqual(false);
  //   });

  //   it("should trigger edit on dblcick", function(){
  //     var spy = jasmine.createSpy();
  //     this.view.on('edit', spy);
  //     this.view.$('p').trigger({type: 'dblclick'});
  //     expect(spy.callCount).toEqual(1);
  //   });

  //   it("should destroy model when hitting delete", function(){
  //     var spy = jasmine.createSpy();
  //     this.todo.on('destroy', spy);

  //     this.view.$('a.icon-delete').click();

  //     expect(spy.callCount).toEqual(1);
  //   });
  
  // });

});