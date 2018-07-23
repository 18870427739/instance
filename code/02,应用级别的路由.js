
const express = require("express");

const app = express();

app.get("/",function (req, res) {
    res.send("<h1>这是首页面</h1>")
});
app.get("/login",function (req, res) {
    res.send("<h1>这是登录页面</h1>")
});
app.get("/list",function (req, res) {
    res.send("<h1>这是列表页面</h1>")
})

app.listen(3000);








