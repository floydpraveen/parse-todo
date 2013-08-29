define(['models/todo', 'views/todoView', 'helper', 'sinon'],
function(Todo, View, helper, sinon) {

describe("MODEL --TODO", function() {

  beforeEach(function() {
    this.server = sinon.fakeServer.create();
    this.todo = new Todo();
    this.todo.url = helper.todosUrl;
    this.todo.set({'title':'foo'});
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
      this.server.respondWith(
        "POST",
        helper.todosUrl,
        [ 200,
          {
          "Content-Type": "application/json"
          },
          JSON.stringify({
              "createdAt": "2013-08-29T08:11:03.213Z",
              "objectId": "ZI9Ry6JqgE"
          })
        ]);
      this.todo.save();
      this.server.respond();
      expect(this.todo.id).toBeDefined();
  })

});



});