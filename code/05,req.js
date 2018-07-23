
const express = require("express");
const app = express();
app.get("/login",function (req, res) {
    // console.log(req);
    // console.log(req.query);
    console.log(req.path);
    res.send("req对象");
});
app.get("/user/haha",function (req, res) {
    console.log(req.path);
    res.send("req对象");
});
app.listen(3000);








