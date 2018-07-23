
const express = require("express");
const app = express();
// 得到一个router对象
const router = express.Router();

// 在app中添加router中间件
app.use(router);

router.get("/",function(req,res){
	res.send("<h1>路由级别的中间件</h1>");
});

app.listen(3000);










