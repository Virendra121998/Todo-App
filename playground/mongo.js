const {MongoClient,ObjectID}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/todoapp',(err,db)=>{
	if(err)
		return console.log('error occured');
    console.log('connected to the database');
	// db.collection('todo').insertOne({
	// 	name:'virendra',
	// 	college:'ABV-IIITm'
	// },(err,result)=>{
	// 	if(err)
	// 		return console.log('error occured');
	// 	console.log(JSON.stringify(result.ops,undefined,2));
	// });
	db.collection('todo').insertOne({
		name:'harsh',
		age:21,
		location:'allahbad'
	},(err,result)=>{
		if(err)
			return console.log('error occured');
		console.log(result.ops);
	});
	db.close();
});