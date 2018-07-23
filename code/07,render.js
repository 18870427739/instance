const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//路由
app.get('/',function(req,res){
    res.render('test');
});
app.listen(3000);























