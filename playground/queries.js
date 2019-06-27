const {ObjectId}=require('mongodb');
const {mongoose}=require('./../server/db/mongoose');
const {user}=require('./../server/models/Users');
var id="5d0f25f63537ad28e84fd171";
user.findById(id).then((docs)=>{
	if(!docs)
		return console.log('no item found');
	console.log('Users',docs);
}).catch((e)=>console.log(e));