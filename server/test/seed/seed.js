const {ObjectId}=require('mongodb');
var request=require('supertest');
var expect=require('expect');
const jwt=require('jsonwebtoken');
const {todo}=require('./../../models/Todo');
const {user}=require('./../../models/Users');
const {ObjectID}=require('mongodb');
const t=[{
	_id: new ObjectID(),
	text:"1 test todo"
},{
	_id:new ObjectID(),
	text:"2 test todo"
}];


var i1=new ObjectID();
var i2=new ObjectID();
const u=[{
	_id:i1,
	email:"1@gmail.com",
	password:"password1",
	tokens:[{
      access:'auth',
      token: jwt.sign({_id:i1,access:'auth'},"secret").toString()
	}]
},{
  _id:i2,
  email:"2@gmail.com",
  password:"password2",
}];

const populatetodos=(done)=>{
	todo.remove({}).then(()=>{
		return todo.insertMany(t);
	}).then((docs)=>{done()});
};


const populateusers=(done)=>{
   user.remove({}).then(()=>{
   	 var user1=new user(u[0]).save();
   	 var user2=new user(u[1]).save();
     return Promise.all([user1,user2]);   
   }).then(()=>{
   	done();
   });
   
};
module.exports={t,u,populatetodos,populateusers};


