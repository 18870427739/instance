// 第一步，载入express
const express = require("express");

// 第二步，利用express创建一个应用
const app = express();

// 第三步，提供一个http服务
app.get("/",function (req, res) {
    res.send("<h1>Hello, Express</h1>");
});

// 第四步，监听端口
app.listen(3000);





























