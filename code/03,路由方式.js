
const express = require("express");
const app = express();
app.get("/login",function (req, res) {
    // res.send("Hello");
    res.sendFile(__dirname + "/03,post.html");
});
app.post("/user",function (req, res) {
    res.send("你提交了");
})
app.listen(3000);








