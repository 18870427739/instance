// 第一步，载入express
const express = require("express");
// 第二步，调用express函数，创建一个应用
const app = express();
// 第三步，创建一个http server服务
app.get("/",function (req, res) {
   res.send("<h1>Hello,Word!</h1>");
});
// 第三步，监听端口
app.listen(3000);










