define(['models/todo','views/todoView'],
function(Todo, View) {
        
 describe('View ::TODO', function() {

  var mockData = { title: 'Foo Bar',
                   done: true };

  beforeEach(function() {
    var flag = false;

      this.todo = new Todo(mockData);
      this.todo.sync = function(){};
      this.view = new View({model: this.todo});
      $('#sandbox').html(this.view.render().el);
      flag = true;


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

});


 });