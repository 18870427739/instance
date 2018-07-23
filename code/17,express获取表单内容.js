
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
// 对所有请求使用bodyParser中间件，bodyParser.urlencdoed,处理表单内容
app.use(bodyParser.urlencoded({extended:false}));
// 将表单中的内容转成一个对象
app.use(bodyParser.json());
// 加载静态页面
app.get("/login",function(req,res){
	res.sendFile(path.join(__dirname,"16,表单.html"));
});
app.post("/login",function(req,res){
	// 使用express的第三方中间件获取表单提交的内容
	// 使用req.body就可以获取转化后的对象
	console.log(req.body.username);
	console.log(req.body.pwd);
});
app.listen(3000);













