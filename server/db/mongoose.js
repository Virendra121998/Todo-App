var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGOD_URI||'mongodb://localhost:27017/todoapp');

module.exports={mongoose};