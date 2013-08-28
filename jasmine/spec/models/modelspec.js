define(['models/todo', 'views/todoView', 'helper', 'sinon'],
function(Todo, View, helper, sinon) {

describe("TDOO model", function() {
  
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
    this.todo = new Todo();
    this.todo.url = helper.todosUrl;
  });
    
  afterEach(function() {
    this.server.restore();
  });

  it("should fire the change event", function() {
    var callback = sinon.spy();
    
    // Set how the fake server will respond
    // This reads: a GET request for api
    // will return a 200 response of type 
    // application/json with the given JSON response body
    this.server.respondWith("GET", helper.todosUrl,
      [200, {"Content-Type": "application/json"},
      '{"id":123,"title":"Hollywood - Part 2", "done":false}']);
    
    // Bind to the change event on the model
    this.todo.bind('change', callback);
    
    // makes an ajax request to the server
    this.todo.fetch(); 
    
    // Fake server responds to the request
    this.server.respond(); 
        
    // Expect that the spy was called with the new model
    expect(callback.called).toBeTruthy();
    expect(callback.getCall(0).args[0].attributes)
      .toEqual({
        id: 123,
        title: "Hollywood - Part 2",
        done:false
      });
    
  });


  it('toggle the done value', function(){
     this.todo.set({'id':123, 'title':'name', 'done':true});
     this.todo.toggle();
     expect(this.todo.get('done')).toBe(false);
  })

  it('toggle back to original value when server returns 404', function(){
     this.todo.set({'id':123, 'title':'name', 'done':true});
     //MAKE FAKE SERVER TO RETURN 404, SO WE CAN CHECK ERROR CALLBACK
     this.server.respondWith("GET", helper.todosUrl,
      [404, {"Content-Type": "application/json"},
      '']);
     this.todo.toggle();
     this.server.respond(); 
     expect(this.todo.get('done')).toBe(true);
  })

   it('validation', function(){
      this.server.respondWith("GET", helper.todosUrl,
      [200, {"Content-Type": "application/json"},
      '{"createdAt":"2013-08-28T06:03:50.275Z","objectId":"TVaq2Uk8Ns"}']);
      this.todo.save({title:'name'});
      this.server.respond(); 
      console.log(this.todo.toJSON());
      expect(this.todo.id).toBeUndefined();
  })

});



});