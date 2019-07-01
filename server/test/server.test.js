var request=require('supertest');
var expect=require('expect');
var {ObjectID}=require('mongodb');
var {app}=require('./../server');
var{todo}=require('./../models/Todo');
var {user}=require('./../models/Users');
const {t,u,populatetodos,populateusers}=require('./seed/seed');

beforeEach(populateusers);
beforeEach(populatetodos);
// describe("post /todos",()=>{
// 	it('should create a new todo',(done)=>{
//       var text='Test todo text';

//       request(app).
//       post('./todos')
//       .send({text})
//       .expext(200)
//       .expect((res)=>{
//       	expect(res.body.text).toBe(text);
//       })
//       .end((err,res)=>{
//          if(err)
//          	return done(err);
//          todo.find().then((todos)=>{
//          	expect(todos.length).toBe(1);
//          	expect(todos[0].text).toBe(text);
//          	done();
//          }).catch((e)=>done(e));
//       });
//     });  
// });
describe("get /todos",()=>{
	it('should return the present todo',(done)=>{
		request(app)
		.get('./todos')
		.expect(200)
		.expect((res)=>{
           expect(res.body.docs.length).toBe(2);
		})
		.end(done);
	});
});
describe('get /todos/id',()=>{
	it('should return the todo',(done)=>{
		request(app)
		.get(`/todos/${t[0]._id.toHexString()}`)
		.expect(200)
		.expect((res)=>{
			expect(res.body.docs.text).toBe(t[0].text);
		})
		.end(done);
	});
	it('should return 404 ',(done)=>{
		request(app)
		.get(`/todos/${t[0]._id}`)
		.expect(404).
		end(done);
	});
	it('should return 404 for invalid id',(done)=>{
		request(app)
		.get('/todos/113').
		expect(404)
		.end(done);
	});
});
describe('get/users/me',()=>{
	it('should return validation errors',(done)=>{
		var email='virendra';
		var password='123dsa';
		request(app)
		.get('/users/me')
		.expect(500)
		.expect((res)=>{
			expect(res.body).toEqual({});

		})
		.end(done)
	});
   it('should not create email if it is already in use',(done)=>{
   	   var email=u[0].email;
   	   var password=u[0].password;
   	   request(app)
   	   .post('/users')
   	   .send({email,password})
   	   .expect(400)

   	   .end(done)
   });

});
describe('delete/users/logout',()=>{
	it('should delete the token ',(done)=>{
		request(app)
		.delete('/users/logout')
		.set('x-auth',u[0].tokens[0].token)
		.expect(200)
		.end((err,res)=>{
			if(err)
				return done(err);
		    user.findById(u[0]._id).then((result)=>{
		    	expect(result.tokens.length).toBe(0);
		    	done();
		    }).catch((e)=>done(e));	
		});
	});
});