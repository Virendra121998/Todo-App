var mongoose=require('mongoose');
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

module.exports={user};