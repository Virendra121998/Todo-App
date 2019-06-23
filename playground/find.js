const {MongoClient,ObjectID}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/todoapp',(err,db)=>{
	if(err)
		return console.log('error occured');
    console.log('connected to the database');
    db.collection('todo').find({name:'virendra'}).toArray().then((docs)=>{
    	console.log(`todo `);
    	console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
    	console.log('unable to fetch');
    });
});    