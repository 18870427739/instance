
const express = require("express");
const path = require("path");
const app = express();
app.get("/",function (req, res) {
    // res.send("<h1>1234567</h1>");
    // res.sendFile(__dirname + "/06,index.html");
    // res.sendFile(path.join(__dirname, "06,index.html"));
    res.json({name:"wangcai",age:5});
});

app.listen(3000);








