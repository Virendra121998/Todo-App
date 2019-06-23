const {MongoClient,ObjectID}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/todoapp',(err,db)=>{
	if(err)
		return console.log('error occured');
    console.log('connected to the database');
    // db.collection('todo').insertOne({
    // 	name:'harsh',
    // 	college:'ABV IIITM'
    // },(err,result)=>{
    // 	if(err)
    // 		return console.log('ot possible');
    // 	console.log(JSON.stringify(result.ops,undefined,2));
    // // });
    // db.collection('Users').deleteOne({name:'harsh'}).then((results)=>{
    // 	console.log(results);
    // });
    
     db.collection('Users').deleteMany({name:'Virendra'}).then((results)=>{
    	console.log(results);
    })
    });