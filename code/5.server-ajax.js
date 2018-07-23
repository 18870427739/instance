/**
 * Created by diamondwang on 2016/8/26.
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
//使用中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
//显示注册表单
app.get('/reg',function(req,res){
    res.sendFile( path.join(__dirname, '4.使用ajax检测用户名.html') );
});
//模拟从数据库中取出的用户数据
var users = ['admin','root','test'];
//处理用户的注册动作,使用iframe提交的是get请求
app.post('/signin',function(req,res){
    //获取get提交的用户名
    //var username = req.query.username;
    //获取post方式提交的用户名
    var username = req.body.username;
    //需要判断用户是否存在于users中
    if (in_array(username,users)){
        //说明该用户名已经存在
        res.send(username + '--对不起，该用户名已被占用');
    }else {
        res.send(username + '--恭喜您，该用户名可用');
    }
});
app.listen(3000);
//封装一个函数，判断某个字符串str是否存在于数组arr中
//如果存在，返回true，否则返回false
function in_array(str,arr){
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == str) {
            return true;
        }
    }
    return false;
}