
const express = require("express");

const app = express();

app.use(function (req, res, next) {
    console.log("use方式使用的中间件");
    next();
});

app.get("/",function (req, res) {
    res.send("<h1>中间件</h1>")
})

app.listen(3000);























