// 第一步，载入express
const express = require("express");
// 第二步，调用express函数，创建一个应用
const app = express();
// 中间件，没有path，表示所有的请求都要使用这个中间件
app.use(function(req,res,next){
	console.log("应用级别的中间件");
	next();
});
// 第三步，创建一个http server服务
app.get("/",function (req, res) {
   res.send("<h1>中间件</h1>");
});
//第三步，监听端口
app.listen(3000);










