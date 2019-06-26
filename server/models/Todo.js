var mongoose=require('mongoose');
var todom=mongoose.model('todo',{
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
module.exports={todom};