var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/todoapp');
var todo=mongoose.model('todo',{
	text:{
		type:String
	},
	completed:{
		type:Boolean
	},
	createdAt:{
        type:Number
	}
});
var newtodo=new todo({
	text:'Hi there',
	completed:true,
	createdAt:123
});
newtodo.save().then((results)=>{
	console.log(results)
},(err)=>{
	console.log('unable to store');
});
var user=mongoose.model('Users',{
	email:{
		type:String,
		required:true,
		trim:true
	},
	name:{
		type:String,
		required:true
	}
});

var user1=new user({
	email:'   virendrasingha110@gmail.com',
    name:'Virendra'
});
user1.save().then((results)=>{
	console.log(results);
},(err)=>{
	console.log('unable to connect');
});