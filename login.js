var express = require('express');
var path=require('path');
var app=express();
var mysql = require('mysql');
var bodyParser=require('body-parser');
app.use(bodyParser());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "    ",
  database: "hms"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static(__dirname + '/dist'));

app.get('/',function(req,resp){
	resp.sendFile('index.html',{root: path.join(__dirname, '')});
	console.log(req);
	console.log(resp);
})

app.get('/main.html',function(req,resp){
	resp.sendFile('main.html',{root: path.join(__dirname, '')});
	//console.log(req);
	//console.log(resp);
})

app.post('/signup',function(req,resp){
	var values=req.body;
	var sql = "INSERT INTO student_info (email, password, roll_no, phone_no, room_no, gender) VALUES ('"+values.email+"','"+values.password+"','"+values.rollno+"','"+values.phoneno+"','"+values.roomno+"','"+values.gender+"')";
  	//resp.end(next);
  	con.query(sql, function (err, result) {
	    if (err){ 
	    	console.log(err);
	    	resp.end("false");
	    	return;
	    }
	    console.log("1 record inserted");
	    resp.end("true");
	    return;
  	});
  	//resp.end("Error Check feilds");
})

app.get('/signin',function(req,resp){
	var values=req.query;
	var sql = "SELECT * FROM student_info WHERE email='"+values.email+"' and password='"+values.password+"'";
  	con.query(sql, function (err, result) {
	    if (err){ 
	    	console.log(err);
	    	resp.end("false");
	    	return;
	    }
	    console.log(result.length);
	    if(result.length==0){
	    	resp.end("false");
	    	return;
	    }
	    resp.end(JSON.stringify(result));
	    return;
  	});
})

app.listen(8000,function(){
	console.log('listening');
})