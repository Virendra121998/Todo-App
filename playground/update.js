const {MongoClient,ObjectID}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/todoapp',(err,db)=>{
	if(err)
		return console.log('error occured');
    console.log('connected to the database');
    db.collection('Users').findOneAndUpdate({_id: new ObjectID('5d0e8272908c50231037dd05')},
    {
    	$set:{
          name:'Virendra',
          location:'Dehradun'		
    	},
        $inc:{
        	age:-2
        }
    },{returnOriginal:false}
    ).then((results)=>{
    	console.log(results);
    });
});    