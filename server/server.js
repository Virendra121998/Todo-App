//library
var {mongoose}=require('./db/mongoose');
var {todo}=require('./models/Todo'); 
var {user}=require('./models/Users');
var {authenticate}=require('./middleware/authenticate');
const bcrypt=require('bcryptjs'); 

var express=require('express');
var bodyparser=require('body-parser');
var port=process.env.PORT||3000;
var app=express();
app.use(bodyparser.json());
app.post('/todos',(req,res)=>{
	var newtodo=new todo({
		text:req.body.text,
		completed:req.body.completed,
		createdAt:req.body.createdAt
	});
    newtodo.save().then((doc)=>{
      res.send(doc);
    },(e)=>{
    	res.status(400).send(e);
    });
});
app.get('/todos',(req,res)=>{
	todo.find().then((docs)=>{
       res.send({docs});
	},(e)=>{
		res.status(400).send(e);
	});
});
app.post('/users',(req,res)=>{
	var User=new user({
		email:req.body.email,
		password:req.body.password,
	});
	User.save().then(()=>{
		return User.generateAuthtoken();
	}).then((token)=>{
		res.header('x-auth',token).send(User);
	})
	.catch((e)=>res.status(400).send(e));
});
app.get('/users/me',authenticate,(req,res)=>{
	res.send(req.docs);
	});
app.post('/users/login',(req,res)=>{
	
	user.findByCredentials(req.body.email,req.body.password).then((result)=>{
		return result.generateAuthtoken().then((token)=>{
			res.header('x-auth',token).send(result);
		});
	}).catch((e)=>{
		res.status(400).send("could not find the user");
	});
});
app.delete('/users/logout',authenticate,(req,res)=>{
	req.docs.removeToken(req.token).then(()=>{
		res.status(200).send('logged out');
	}).catch((e)=>{
		res.status(400).send();
	});
});
// app.post('/todo',(req,res)=>{
// 	var newtodo=new todom({
// 		text:req.body.text
// 	});
//     newtodo.save().then((doc)=>{
//       res.send(doc);
//     },(e)=>{
//     	res.status(400).send(e);
//     });
// });
app.get('/todos/:id',(req,res)=>{
	var id=req.params.id;
	todo.findById(id).then((docs)=>{
		if(!docs)
		 res.status(404).send();
        res.send({docs});
	}).catch((e)=>{
		res.status(404).send();
	});
});
app.listen(port,()=>{
	console.log('started app on port 3000');
});
module.exports={app};















// var newtodo=new todo({
// 	text:'Hi there',
// 	completed:true,
// 	createdAt:123
// });
// newtodo.save().then((results)=>{
// 	console.log(results)
// },(err)=>{
// 	console.log('unable to store');
// });


// var user1=new user({
// 	email:'   virendrasingha110@gmail.com',
//     name:'Virendra'
// });
// user1.save().then((results)=>{
// 	console.log(results);
// },(err)=>{
// 	console.log('unable to connect');
// });