const express = require('express');
const path = require('path');
const app = express();

app.get("/user",function (req, res) {
    res.redirect('/login');
})

app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname,"03,post.html"))
});
app.listen(3000);























