var {user}=require('./../models/Users');
var authenticate=(req,res,next)=>{
	var token=req.header('x-auth');
	user.findByToken(token).then((docs)=>{
		if(!docs)
			return new Promise.reject();
		req.docs=docs;
		req.token=token;
		next();
	}).catch((e)=>{
        res.status(401).send();
	});
};
module.exports={authenticate};