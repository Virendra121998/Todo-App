var mongoose=require('mongoose');
var todo=mongoose.model('todos',{
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
module.exports={todo};