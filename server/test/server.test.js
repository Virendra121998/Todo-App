var request=require('supertest');
var expect=require('expect');

var {app}=require('./../server');
var{todo}=require('./../models/Todo');
const t=[{
	text:"1 test todo"
},{
	text:"2 test todo"
}];
beforeEach((done)=>{
	todo.remove({}).then(()=>{
		return todo.insertMany(t);
	}).then((docs)=>{done()});
});
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
           expect(res.body.t.length).toBe(2);
		})
		.end(done);
	});
});