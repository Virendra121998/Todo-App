const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
var Userschema=new mongoose.Schema({
	email:{
		type:String,
		required:true,
		trim:true,
		minlength:2,
		unique:true,
		validate:validator.isEmail,
	},
	password:{
		type:String,
		required:true,
		minlength:4
	},
	tokens:[{
		access:{
			type:String,
			required:true,
		},
		token:{
			type:String,
			required:true
		}	
	}],
});
Userschema.methods.toJSON=function(){
	var User=this;
	var Userobject=User.toObject();
	return _.pick(Userobject,['_id','email']);
}
Userschema.methods.generateAuthtoken=function(){
	var User=this;
	var access='auth';
    var token=jwt.sign({_id:User._id.toHexString(),access},"secret").toString();
    User.tokens=User.tokens.concat({access,token});
    return User.save().then(()=>{
    	return token;
    });
};
var user=mongoose.model('Users',Userschema);

module.exports={user};