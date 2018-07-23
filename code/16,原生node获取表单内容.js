
const express = require("express");
const path = require("path");
const querystring = require("querystring");

const app = express();

app.get("/login",function(req,res){
	res.sendFile(path.join(__dirname,"16,表单.html"));
});

app.post("/login",function(req,res){
	var str = "";
	req.on("data",function(chunk){
		str += chunk;
	});
	req.on("end",function(){
		var obj = querystring.parse(str);
		console.log(obj);
	});
});

app.listen(3000);

























