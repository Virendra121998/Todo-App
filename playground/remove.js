var {mongoose}=require('./../server/db/mongoose');
var {ObjectID}=require('mongodb');
var {todo}=require('./../server/models/Todo');

// todo.remove({}).then((docs)=>{
//   console.log(docs);
// });
todo.findByIdAndRemove("5d16341ea7e0272d5c3f0379").then((docs)=>{
	console.log({docs});
});