var mongoose=require('mongoose');
var todo=mongoose.model('todos',{
	text:{
		required:true,
		type:String
	},
	completed:{
		
		type:Boolean
	},
	createdAt:{
        
        type:Number
	},
	creator:{
		
		type:mongoose.Schema.Types.ObjectId
	}
});
module.exports={todo};