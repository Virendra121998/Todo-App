const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
var data={
	id:10
};
var token=jwt.sign(data,"secret");
console.log('token',token);
var decoded=jwt.verify(token,'secret');
console.log("decoded",decoded);
// var message="I m virendra";
// var hash=SHA256(message).toString();
// console.log("hash",hash);
// var data={
// 	id:3
// };
// var token={
// 
//     ha:SHA256(JSON.stringify(data)+"somesecert").toString()
//    };


// var resulthash=SHA256(JSON.stringify(token.data)+"somesecert").toString();
// if(resulthash===token.ha)
//  console.log('data not manipulated');
// else
//  console.log('data manipulated');    