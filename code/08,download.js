const express = require('express');
const path = require('path');
const app = express();

app.get("/",function (req, res) {
    res.sendFile(path.join(__dirname,"08,list.html"));
})

app.get('/down',function(req,res){
    console.log();
    var file = req.query.filename;
    res.download(file);
});
app.listen(3000);























