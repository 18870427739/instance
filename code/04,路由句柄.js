
const express = require("express");
const app = express();
app.get("/login",function (req, res,next) {
    console.log("第一个回调函数")
    next();
},function (req, res, next) {
    console.log("第二个回调函数")
    next();
},function (req, res) {
    console.log("第三个回调函数")
});
app.listen(3000);








