const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcryptjs'); 
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
Userschema.statics.findByToken=function(token){
	var User=this;
	var decoded;
	try{
		decoded=jwt.verify(token,"secret");
	}catch(e){

	}
	return User.findOne({
		'_id':decoded._id,
		'tokens.access':'auth',
		'tokens.token':token,
	});
};
Userschema.pre('save',function(next){
	var User=this;
	if(User.isModified()){
      bcrypt.genSalt(10,(err,salt)=>{
      	bcrypt.hash(User.password,salt,(err,hash)=>{
      	  User.password=hash;
      	   next();	
      	});
      });
     
	}
	else
		next();
});
var user=mongoose.model('Users',Userschema);

module.exports={user};