//library
var {mongoose}=require('./db/mongoose');
var {todom}=require('./models/Todo');
var {Users}=require('./models/Users');

var express=require('express');
var bodyparser=require('body-parser');

var app=express();
app.use(bodyparser.json());
app.post('/todo',(req,res)=>{
	var newtodo=new todom({
		text:req.body.text,
		completed:req.body.completed,
		time:req.body.time
	});
    newtodo.save().then((doc)=>{
      res.send(doc);
    },(e)=>{
    	res.status(400).send(e);
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

app.listen(3000,()=>{
	console.log('started app on port 3000');
})















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